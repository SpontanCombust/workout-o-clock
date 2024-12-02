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