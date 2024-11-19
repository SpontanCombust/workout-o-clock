package com.spontancombust.workoutoclock.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.spontancombust.workoutoclock.validators.ValidColorHex;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutTaskDto {

    private Long id;

    private Long setId;

    private Integer index;

    private String title;

    private WorkoutTaskObjectiveDto objective;

    @ValidColorHex
    private String cardColorHex;

}
