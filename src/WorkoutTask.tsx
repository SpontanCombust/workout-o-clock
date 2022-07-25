export enum CompletionConditionType {
    TIME,
    REPS,
}

export interface CompletionConditionTime {
    type: CompletionConditionType.TIME;
    minutes: number;
    seconds: number;
}

export interface CompletionConditionReps {
    type: CompletionConditionType.REPS;
    reps: number;
}

export type CompletionCondition = CompletionConditionTime | CompletionConditionReps;

export class WorkoutTask {
    static idCounter = 0;

    id: number;
    title: string;
    completionCondition: CompletionCondition;
    cardColor: string;

    constructor(title: string, completionCondition: CompletionCondition, cardColor: string) {
        this.id = WorkoutTask.idCounter++;
        this.title = title;
        this.completionCondition = completionCondition;
        this.cardColor = cardColor;
    }
}