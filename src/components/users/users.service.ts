import { IUser } from './user.interface';

const users: IUser[] = [
    {
        id: 'f98dc723-3db9-4f58-a6eb-473feea483a8',
        username: 'user 1',
        age: 54,
        hobbies: [
            'programming',
            'boxing',
        ],
    },
    {
        id: 'fda5eb2d-e58b-41cd-ac4b-670c56021690',
        username: 'user 2',
        age: 11,
        hobbies: [
            'painting',
        ],
    },
];

const findAllUsers = async (): Promise<IUser[]> => users;

const findUserById = async (id: string): Promise<IUser | null> => {
    const user = users.find((u) => u.id === id);

    return user || null;
};

const updateUser = async (user: IUser, newUser: IUser): Promise<IUser> => {
    const userIndex = users.indexOf(user);

    users[userIndex] = newUser;

    return newUser;
};

const deleteUser = async (user: IUser): Promise<void> => {
    const userIndex = users.indexOf(user);

    users.splice(userIndex, 1);
};

const createUser = async (user: IUser): Promise<void> => {
    users.push(user);
};

export {
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser,
    createUser,
};
