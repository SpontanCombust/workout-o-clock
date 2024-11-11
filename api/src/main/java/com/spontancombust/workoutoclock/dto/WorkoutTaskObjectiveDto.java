package com.spontancombust.workoutoclock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public abstract class WorkoutTaskObjectiveDto {
    private String objectiveType;
}