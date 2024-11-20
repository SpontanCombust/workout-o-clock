package com.spontancombust.workoutoclock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthTokenPair {
    private String accessToken;
    private String refreshToken;    
}
