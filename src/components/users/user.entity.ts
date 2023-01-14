import { v4 as uuid } from 'uuid';
import { IUser } from './user.interface';

class User implements IUser {
    public readonly id: string;

    public username: string;

    public age: number;

    public hobbies: string[];

    constructor(username: string, age: number, hobbies: string[], id: string = uuid()) {
        this.id = id;
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
}

export { User };
