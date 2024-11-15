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
import com.spontancombust.workoutoclock.model.User;
import com.spontancombust.workoutoclock.repositories.UserRepository;
import com.spontancombust.workoutoclock.security.JwtService;
import com.spontancombust.workoutoclock.security.UserPrincipal;


public interface AuthService {

    String signIn(String email, String password) throws AuthenticationException;

    void signOut();
    
    User signUp(String email, String password, String username) throws EmailTakenException;

    //TODO change password


    User getSignedInUser();
}


@Service
@AllArgsConstructor
class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;


    public String signIn(String email, String password) throws AuthenticationException {
        var auth = this.authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );

        SecurityContextHolder.getContext().setAuthentication(auth);
        var principal = (UserPrincipal)auth.getPrincipal();

        String token = jwtService.issueToken(principal);
        return token;
    }

    public void signOut() {
        SecurityContextHolder.getContext().setAuthentication(null);
    }

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
