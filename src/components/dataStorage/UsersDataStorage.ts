import { User } from '../users/user.entity';
import { IUser } from '../users/user.interface';

class UsersDataStorage {
    private users: User[] = [];

    public findUserById = async (id: string): Promise<IUser | null> => {
        const user = this.users.find((u) => u.id === id);

        return user || null;
    };

    public findAllUsers = async (): Promise<IUser[]> => this.users;

    public updateUser = async (user: IUser, newUser: IUser): Promise<IUser> => {
        const userIndex = this.users.indexOf(user);

        this.users[userIndex] = newUser;

        return newUser;
    };

    public deleteUser = async (user: IUser): Promise<void> => {
        const userIndex = this.users.indexOf(user);

        this.users.splice(userIndex, 1);
    };

    public createUser = async (user: IUser): Promise<void> => {
        this.users.push(user);
    };

    public clearAll = async (): Promise<void> => {
        this.users = [];
    };
}

const usersDataStorage = new UsersDataStorage();

export { usersDataStorage };
