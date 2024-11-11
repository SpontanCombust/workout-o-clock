package com.spontancombust.workoutoclock.converters;

import com.spontancombust.workoutoclock.dto.WorkoutTaskDetailsDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskObjectiveDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskRepsObjectiveDto;
import com.spontancombust.workoutoclock.dto.WorkoutTaskTimeObjectiveDto;
import com.spontancombust.workoutoclock.model.WorkoutTask;


public class WorkoutTaskDetailsDtoConverter implements DtoConverter<WorkoutTask, WorkoutTaskDetailsDto> {

    @Override
    public WorkoutTaskDetailsDto fromModel(WorkoutTask model) {
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

        return new WorkoutTaskDetailsDto(
            model.getIndex(),
            model.getTitle(),
            objective,
            model.getCardColorHex()
        );
    }
    
}
