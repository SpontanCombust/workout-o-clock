package com.spontancombust.workoutoclock.dto;

import com.spontancombust.workoutoclock.dto.common.WorkoutTaskObjectiveDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public class WorkoutTaskControllerDtos {
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateWorkoutTaskRequestDto {
        private String title;
        private WorkoutTaskObjectiveDto objective;
        private String cardColorHex;
    }


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateWorkoutTaskRequestDto {
        private Integer index;
        private String title;
        private WorkoutTaskObjectiveDto objective;
        private String cardColorHex;
    }
}
