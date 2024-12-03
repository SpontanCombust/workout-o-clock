import { WorkoutTaskObjectiveDto } from "../api/dto/common/WorkoutTaskObjectiveDto"
import { WorkoutTaskObjective, WorkoutTaskObjectiveType } from "../types/WorkoutTaskObjective"


export default class WorkouTaskObjectiveConverter {
    fromDto(dto: WorkoutTaskObjectiveDto) : WorkoutTaskObjective {
        switch(dto.objectiveType) {
            case "T":
                return {
                    type: WorkoutTaskObjectiveType.TIME,
                    minutes: Math.floor(dto.timeSeconds / 60),
                    seconds: dto.timeSeconds % 60
                }
            case "R":
                return {
                    type: WorkoutTaskObjectiveType.REPS,
                    reps: dto.reps
                }
            default:
                throw Error("Unknown task objective type")
        }
    }

    intoDto(model: WorkoutTaskObjective) : WorkoutTaskObjectiveDto {
        switch(model.type) {
            case WorkoutTaskObjectiveType.TIME:
                return {
                    objectiveType: "T",
                    timeSeconds: model.minutes * 60 + model.seconds
                }
            case WorkoutTaskObjectiveType.REPS:
                return {
                    objectiveType: "R",
                    reps: model.reps
                }
        }
    }
}