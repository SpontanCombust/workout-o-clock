package com.spontancombust.workoutoclock.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;


@Data
@Configuration
@ConfigurationProperties("woc.security.jwt")
public class JwtProperties {
    private String secretKey;
    private Integer duration;
}
