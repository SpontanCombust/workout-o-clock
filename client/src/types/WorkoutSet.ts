export default class WorkoutSet {
    id: number;
    title: string;
    cardColorHex: string;

    constructor(
        id: number,
        title: string,
        cardColorHex: string
    ) {
        this.id = id;
        this.title = title;
        this.cardColorHex = cardColorHex;
    }
}