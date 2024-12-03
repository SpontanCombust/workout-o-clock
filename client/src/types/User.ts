export default class User {
    id: number;
    username: string;
    email: string;
    createdDate: Date;
    modifiedDate?: Date;

    constructor(
        id: number,
        username: string,
        email: string,
        createdDate?: Date,
        modifiedDate?: Date,
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdDate = createdDate ?? new Date();
        this.modifiedDate = modifiedDate;
    }
}