package com.spontancombust.workoutoclock.security;

import java.time.Duration;
import java.time.Instant;

import org.springframework.stereotype.Service;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class JwtService {
    private final JwtProperties jwtProperties;

    private final String EMAIL_CLAIM_NAME = "em";
    // private final String AUTHORITIES_CLAIM_NAME = "a";

    /** Returns encoded authentication token */
    public String issueToken(UserPrincipal principal) {
        return JWT.create()
                .withSubject(String.valueOf(principal.getUserId()))
                .withExpiresAt(Instant.now().plus(Duration.ofSeconds(jwtProperties.getDuration())))
                .withClaim(this.EMAIL_CLAIM_NAME, principal.getEmail())
                // .withClaim(this.AUTHORITIES_CLAIM_NAME, principal.getAuthorities().stream().toList())
                .sign(Algorithm.HMAC256(jwtProperties.getSecretKey()));
    }

    public UserPrincipal decodeToken(String jwt) {
        var decoded = JWT.require(Algorithm.HMAC256(jwtProperties.getSecretKey()))
            .build()
            .verify(jwt);

        return UserPrincipal.builder()
            .userId(Long.valueOf(decoded.getSubject()))
            .email(decoded.getClaim(this.EMAIL_CLAIM_NAME).asString())
            // .authorities(this.extractAuthoritiesFromClaim(decoded))
            .build();
    }


    // private List<RoleAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt) {
    //     var claim = jwt.getClaim(this.AUTHORITIES_CLAIM_NAME);

    //     if (claim.isNull() || claim.isMissing()) {
    //         return List.of();
    //     } else {
    //         return claim.asList(RoleAuthority.class);
    //     } 
    // }
}
