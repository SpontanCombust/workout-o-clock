package com.spontancombust.workoutoclock.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutTaskDto {
    private Long id;
    private WorkoutSetDto set;
    private Integer index;
    private String title;
    private WorkoutTaskObjectiveDto objective;
    private String cardColorHex;
}
