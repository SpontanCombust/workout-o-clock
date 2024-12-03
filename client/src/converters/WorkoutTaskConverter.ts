import WorkoutTaskDto from "../api/dto/common/WorkoutTaskDto";
import WorkoutTask from "../types/WorkoutTask";
import { WorkoutTaskObjectiveType } from "../types/WorkoutTaskObjective";
import Converters from "./Converters";


export default class WorkoutTaskConverter {
    fromDto(dto: WorkoutTaskDto) : WorkoutTask {
        return new WorkoutTask(
            dto.id,
            dto.setId,
            dto.index ?? 0,
            dto.title ?? '',
            dto.objective
                ? Converters.workoutTaskObjective.fromDto(dto.objective) 
                : { type: WorkoutTaskObjectiveType.REPS, reps: 10 },
            dto.cardColorHex ?? ''
        );
    }

    intoDto(model: WorkoutTask) : WorkoutTaskDto {
        return {
            id: model.id,
            setId: model.setId,
            index: model.index,
            title: model.title,
            objective: Converters.workoutTaskObjective.intoDto(model.objective),
            cardColorHex: model.cardColorHex
        }
    }
}