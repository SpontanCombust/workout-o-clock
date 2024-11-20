package com.spontancombust.workoutoclock.model;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AuthTokenPair {
    private final String accessToken;
    private final String refreshToken;    
}
