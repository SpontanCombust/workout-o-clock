package com.spontancombust.workoutoclock.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public class WorkoutSetControllerDtos {
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateWorkoutSetRequestDto {
        private String title;
        private String cardColorHex;
    }
}
