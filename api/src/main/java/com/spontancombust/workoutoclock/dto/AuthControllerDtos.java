package com.spontancombust.workoutoclock.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.spontancombust.workoutoclock.validators.ValidEmail;


public class AuthControllerDtos {
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignInRequestDto {

        @ValidEmail
        private String email;

        private String password;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignInResponseDto {

        private String accessToken;
        
    }


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignUpRequestDto {

        @ValidEmail
        private String email; 

        private String password; 

        private String username;
        
    }
}
