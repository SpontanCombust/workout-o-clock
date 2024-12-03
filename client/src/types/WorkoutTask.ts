import { WorkoutTaskObjective } from "./WorkoutTaskObjective";

export default class WorkoutTask{
    id: number;
    setId: number;
    index: number;
    title: string;
    objective: WorkoutTaskObjective;
    cardColorHex: string;

    constructor(
        id: number,
        setId: number,
        index: number,
        title: string,
        objective: WorkoutTaskObjective,
        cardColorHex: string
    ) {
        this.id = id;
        this.setId = setId;
        this.index = index;
        this.title = title;
        this.objective = objective;
        this.cardColorHex = cardColorHex;
    }
}