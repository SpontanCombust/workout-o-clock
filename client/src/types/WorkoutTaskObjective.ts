export enum WorkoutTaskObjectiveType {
    TIME,
    REPS,
}

export interface WorkoutTaskTimeObjective {
    type: WorkoutTaskObjectiveType.TIME;
    minutes: number;
    seconds: number;
}

export interface WorkoutTaskRepsObjective {
    type: WorkoutTaskObjectiveType.REPS;
    reps: number;
}

export type WorkoutTaskObjective = WorkoutTaskTimeObjective | WorkoutTaskRepsObjective;