package com.spontancombust.workoutoclock.security;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import com.spontancombust.workoutoclock.exceptions.InvalidRefreshTokenException;
import com.spontancombust.workoutoclock.model.RefreshToken;
import com.spontancombust.workoutoclock.repositories.RefreshTokenRepository;
import com.spontancombust.workoutoclock.repositories.UserRepository;


@Service
@AllArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    private final JwtProperties jwtProperties;
    private final SecureRandom random = new SecureRandom();


    public RefreshToken issueRefreshToken(Long userId) {
        RefreshToken token = RefreshToken.builder()
                                .user(this.userRepository.getReferenceById(userId))
                                .issuedDate(Date.from(Instant.now()))
                                .expiredDate(Date.from(Instant.now().plus(Duration.ofSeconds(jwtProperties.getRefreshDuration()))))
                                .tokenString(this.generateRefreshTokenString())
                                .valid(true)
                                .build();

        return this.refreshTokenRepository.save(token);
    }

    public RefreshToken rotateRefreshToken(String tokenString) throws InvalidRefreshTokenException {
        var oldToken = this.refreshTokenRepository.findByTokenString(tokenString)
                                                .orElseThrow(() -> new InvalidRefreshTokenException());

        if (!oldToken.getValid() || oldToken.getExpiredDate().before(Date.from(Instant.now()))) {
            throw new InvalidRefreshTokenException();
        }

        Long userId = oldToken.getUser().getId();

        oldToken.setValid(false);
        this.refreshTokenRepository.save(oldToken);
        
        return this.issueRefreshToken(userId);
    }

    public void invalidateRefreshToken(String tokenString) {
        var token = this.refreshTokenRepository.findByTokenString(tokenString);

        if (token.isPresent()) {
            token.get().setValid(false);
            this.refreshTokenRepository.save(token.get());
        }
    }

    public void invalidateAllActiveRefreshTokens(Long userId) {
        var tokens = this.refreshTokenRepository.findByUserIdAndExpiredDateAfter(userId, Date.from(Instant.now()));
        for (var t: tokens) {
            t.setValid(false);
        }
        this.refreshTokenRepository.saveAll(tokens);
    }



    private String generateRefreshTokenString() {
        byte[] tokenBytes = new byte[32]; // 256 bits
        this.random.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }
}
