package com.spontancombust.workoutoclock.dto;

import com.spontancombust.workoutoclock.model.WorkoutTaskObjectiveType;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class WorkoutTaskRepsObjectiveDto extends WorkoutTaskObjectiveDto {
    private Integer reps;

    public WorkoutTaskRepsObjectiveDto(Integer reps) {
        super(WorkoutTaskObjectiveType.REPS.getCode());
        this.reps = reps;
    }
}
