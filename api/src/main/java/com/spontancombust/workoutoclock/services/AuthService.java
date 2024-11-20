package com.spontancombust.workoutoclock.services;

import java.time.Instant;
import java.util.Date;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import com.spontancombust.workoutoclock.exceptions.EmailTakenException;
import com.spontancombust.workoutoclock.model.RefreshToken;
import com.spontancombust.workoutoclock.model.AuthTokenPair;
import com.spontancombust.workoutoclock.model.User;
import com.spontancombust.workoutoclock.repositories.UserRepository;
import com.spontancombust.workoutoclock.security.JwtService;
import com.spontancombust.workoutoclock.security.RefreshTokenService;
import com.spontancombust.workoutoclock.security.UserPrincipal;
import com.spontancombust.workoutoclock.security.UserPrincipalService;


public interface AuthService {
    User signUp(String email, String password, String username) throws EmailTakenException;

    //TODO rate-limiting for incorrect credentials
    AuthTokenPair signIn(String email, String password) throws AuthenticationException;

    AuthTokenPair refreshAuth(String refreshToken);

    void signOut(String refreshToken);

    //TODO change password


    User getSignedInUser();
}


@Service
@AllArgsConstructor
class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserPrincipalService userPrincipalService;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;


    @Override
    public AuthTokenPair signIn(String email, String password) throws AuthenticationException {
        var auth = this.authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );

        SecurityContextHolder.getContext().setAuthentication(auth);
        var principal = (UserPrincipal)auth.getPrincipal();

        String accessToken = this.jwtService.issueToken(principal);
        RefreshToken refreshToken = this.refreshTokenService.issueRefreshToken(principal.getUserId());

        return new AuthTokenPair(accessToken, refreshToken.getTokenString());
    }

    @Override
    public User signUp(String email, String password, String username) throws EmailTakenException {
        if (this.userRepository.existsByEmail(email)) {
            throw new EmailTakenException();
        }

        User newUser = User.builder()
                        .email(email)
                        .password(this.passwordEncoder.encode(password))
                        .username(username)
                        .createdDate(Date.from(Instant.now()))
                        .build();

        //TODO email confirmation

        User savedUser = this.userRepository.save(newUser);
        return savedUser;
    }

    @Override
    public AuthTokenPair refreshAuth(String refreshToken) {
        RefreshToken newRefreshToken = this.refreshTokenService.rotateRefreshToken(refreshToken);

        UserPrincipal principal = this.userPrincipalService.loadUserByModel(newRefreshToken.getUser());
        String newAccessToken = this.jwtService.issueToken(principal);

        return new AuthTokenPair(newAccessToken, newRefreshToken.getTokenString());
    }

    @Override
    public void signOut(String refreshToken) {
        this.refreshTokenService.invalidateRefreshToken(refreshToken);
    }


    @Override
    public User getSignedInUser() throws AuthenticationException {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new AuthenticationCredentialsNotFoundException("User not logged in");
        }

        var principal = (UserPrincipal) auth.getPrincipal();
        var user = this.userRepository.findById(principal.getUserId()).get();

        return user;
    }
}
