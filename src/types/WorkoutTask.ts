import uuid from "../utils/uuid";

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
    uuid: string;
    title: string;
    completionCondition: CompletionCondition;
    cardColor: string;

    constructor(title: string, completionCondition: CompletionCondition, cardColor: string) {
        this.uuid = uuid();
        this.title = title;
        this.completionCondition = completionCondition;
        this.cardColor = cardColor;
    }
}