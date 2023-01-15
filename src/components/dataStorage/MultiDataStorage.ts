import cluster from 'node:cluster';
import { IUser } from '../users/user.interface';

class MultiDataStorage {
    public findUserById = async (id: string): Promise<IUser | null> => this.sendCommandToMasterProcess(
        'findUserById',
        [id],
    );

    public findAllUsers = async (): Promise<IUser[]> => this.sendCommandToMasterProcess('findAllUsers');

    public updateUser = async (user: IUser, newUser: IUser): Promise<IUser> => this.sendCommandToMasterProcess(
        'updateUser',
        [user, newUser],
    );

    public deleteUser = async (user: IUser): Promise<void> => {
        await this.sendCommandToMasterProcess('deleteUser', [user]);
    };

    public createUser = async (user: IUser): Promise<void> => {
        await this.sendCommandToMasterProcess('createUser', [user]);
    };

    public clearAll = async (): Promise<void> => this.sendCommandToMasterProcess('clearAll');

    private async sendCommandToMasterProcess(method: string, parameters: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            process.send!({ method, parameters });

            cluster.worker!.once('message', (message) => {
                if (message.method === method) {
                    resolve(message.data);
                } else {
                    reject(message);
                }
            });
        });
    }
}

export { MultiDataStorage };
