import { WorkoutTaskObjectiveDto } from "./common/WorkoutTaskObjectiveDto"

export interface CreateWorkoutTaskRequestDto {
    title?: string,
    objective?: WorkoutTaskObjectiveDto,
    cardColorHex?: string
}


export interface UpdateWorkoutTaskRequestDto {
    index?: number,
    title?: string,
    objective?: WorkoutTaskObjectiveDto,
    cardColorHex?: string
}