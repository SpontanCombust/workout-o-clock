package com.spontancombust.workoutoclock.converters;

import com.spontancombust.workoutoclock.dto.WorkoutTaskDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskObjectiveDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskRepsObjectiveDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskTimeObjectiveDto;
import com.spontancombust.workoutoclock.model.WorkoutTask;


public class WorkoutTaskDtoConverter implements DtoConverter<WorkoutTask, WorkoutTaskDto> {

    @Override
    public WorkoutTaskDto fromModel(WorkoutTask model) {
        WorkoutTaskObjectiveDto objective = null;

        switch (model.getObjectiveType()) {
            case REPS:
                objective = new WorkoutTaskRepsObjectiveDto(
                    model.getObjectiveReps()
                );
                break;
            case TIME:
                objective = new WorkoutTaskTimeObjectiveDto(
                    model.getObjectiveTimeSecs()
                );
                break;
        }

        return new WorkoutTaskDto(
            model.getId(),
            Converters.workoutSetDto.fromModel(model.getSet()),
            model.getIndex(),
            model.getTitle(),
            objective,
            model.getCardColorHex()
        );
    }
}
