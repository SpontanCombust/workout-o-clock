package com.spontancombust.workoutoclock.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.spontancombust.workoutoclock.validators.ValidColorHex;


public class WorkoutSetControllerDtos {
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateWorkoutSetRequestDto {

        private String title;

        @ValidColorHex
        private String cardColorHex;
    }
}
