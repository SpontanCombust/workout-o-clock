package com.spontancombust.workoutoclock.converters;

import com.spontancombust.workoutoclock.dto.WorkoutSetDetailsDto;
import com.spontancombust.workoutoclock.model.WorkoutSet;


public class WorkoutSetDetailsDtoConverter implements DtoConverter<WorkoutSet, WorkoutSetDetailsDto> {

    @Override
    public WorkoutSetDetailsDto fromModel(WorkoutSet model) {
        if (model == null) {
            return null;
        }

        return new WorkoutSetDetailsDto(
            model.getTitle(),
            model.getCardColorHex()
        );
    }
    
}
