export interface UserDto {
    id: number,
    username?: string,
    email?: string,
    createdDate?: string,
    modifiedDate?: string
}


export interface WorkoutSetDto {
    id: number,
    title?: string,
    cardColorHex?: string
}


export interface WorkoutTaskDto {
    id: number,
    setId: number,
    index?: number,
    title?: string,
    objective?: WorkoutTaskObjectiveDto,
    cardColorHex?: string
}

export type WorkoutTaskObjectiveDto =
    WorkoutTaskTimeObjectiveDto |
    WorkoutTaskRepsObjectiveDto;

export interface WorkoutTaskTimeObjectiveDto {
    objectiveType: "T",
    timeSeconds: number
}

export interface WorkoutTaskRepsObjectiveDto {
    objectiveType: "R",
    reps: number
}