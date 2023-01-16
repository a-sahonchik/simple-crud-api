import cluster, { Worker } from 'node:cluster';
import { usersDataStorage } from '../components/dataStorage/UsersDataStorage';
import { WorkerMessage } from '../types/WorkerMessage';

const handleMessage = async (message: WorkerMessage, worker: Worker): Promise<void> => {
    const { method } = message;

    if (Object.prototype.hasOwnProperty.call(usersDataStorage, method)) {
        const parameters = message.parameters ?? [];

        // @ts-ignore
        const result = await usersDataStorage[method](...parameters);

        worker.send({ method, data: result });
    }
};

const shareDataStorageWithWorkers = (): void => {
    // eslint-disable-next-line guard-for-in
    for (const workerId in cluster.workers!) {
        const worker = cluster.workers![workerId]!;

        worker.on('message', async (message) => {
            await handleMessage(message, worker);
        });
    }
};

export { shareDataStorageWithWorkers };
