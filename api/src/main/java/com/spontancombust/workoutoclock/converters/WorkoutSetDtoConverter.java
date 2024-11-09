package com.spontancombust.workoutoclock.converters;

import com.spontancombust.workoutoclock.dto.WorkoutSetDto;
import com.spontancombust.workoutoclock.model.WorkoutSet;


public class WorkoutSetDtoConverter implements DtoConverter<WorkoutSet, WorkoutSetDto> {

    @Override
    public WorkoutSet toModel(WorkoutSetDto dto) {
        if (dto == null) {
            return null;
        }

        return new WorkoutSet(
            dto.getId(), 
            dto.getTitle(), 
            dto.getCardColorHex()
        );
    }

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
