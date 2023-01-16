import { IUser } from '../components/users/user.interface';

type WorkerMessageData = {
    userId?: string;
    user?: IUser;
};

type WorkerMessage = {
    method: string;
    parameters?: WorkerMessageData;
};

export { WorkerMessage };
