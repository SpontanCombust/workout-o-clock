import { StorageObject } from "../storage/AsyncStorageSQL";

export class WorkoutSet extends StorageObject {
    title: string;
    cardColor: string;
    taskIds: string[]; 

    constructor(title: string, cardColor: string) {
        super();
        this.title = title;
        this.cardColor = cardColor;
        this.taskIds = [];
    }
}