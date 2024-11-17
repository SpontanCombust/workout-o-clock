package com.spontancombust.workoutoclock.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutSetDto {
    private Long id;
    private String title;
    private String cardColorHex;
}
