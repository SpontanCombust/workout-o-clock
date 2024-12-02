import { WorkoutTaskObjectiveDto } from "./WorkoutTaskObjectiveDto";

export interface WorkoutTaskDto {
    id: number,
    setId: number,
    index?: number,
    title?: string,
    objective?: WorkoutTaskObjectiveDto,
    cardColorHex?: string
}