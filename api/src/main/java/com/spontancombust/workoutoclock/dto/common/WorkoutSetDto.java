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
public class WorkoutSetDto {

    private Long id;

    private String title;

    @ValidColorHex
    private String cardColorHex;
    
}
