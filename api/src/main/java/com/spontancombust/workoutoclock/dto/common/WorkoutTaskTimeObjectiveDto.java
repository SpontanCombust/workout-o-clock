package com.spontancombust.workoutoclock.dto.common;

import com.spontancombust.workoutoclock.model.WorkoutTaskObjectiveType;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class WorkoutTaskTimeObjectiveDto extends WorkoutTaskObjectiveDto {
    private Integer timeSeconds;

    public WorkoutTaskTimeObjectiveDto(Integer timeSeconds) {
        super(WorkoutTaskObjectiveType.TIME.getCode());
        this.timeSeconds = timeSeconds;
    }
}
