import { WorkoutTaskObjectiveDto } from "./WorkoutTaskObjectiveDto";

export default interface WorkoutTaskDto {
    id: number,
    setId: number,
    index?: number,
    title?: string,
    objective?: WorkoutTaskObjectiveDto,
    cardColorHex?: string
}