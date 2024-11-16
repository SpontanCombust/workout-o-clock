package com.spontancombust.workoutoclock.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutTaskDetailsDto {
    private Integer index; //TODO remove from this type as it shouldn't be passed for new task, restrucutre DTOs
    private String title;
    private WorkoutTaskObjectiveDto objective;
    private String cardColorHex;
}
