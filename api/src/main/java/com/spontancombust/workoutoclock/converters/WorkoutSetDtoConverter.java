package com.spontancombust.workoutoclock.converters;

import com.spontancombust.workoutoclock.dto.common.WorkoutSetDto;
import com.spontancombust.workoutoclock.model.WorkoutSet;


public class WorkoutSetDtoConverter implements DtoConverter<WorkoutSet, WorkoutSetDto> {

    @Override
    public WorkoutSetDto fromModel(WorkoutSet model) {
        if (model == null) {
            return null;
        }

        return new WorkoutSetDto(
            model.getId(),
            model.getTitle(),
            model.getCardColorHex()
        );
    }
    
}
