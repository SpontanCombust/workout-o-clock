import { WorkoutTaskObjectiveDto } from "./CommonDtos";


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