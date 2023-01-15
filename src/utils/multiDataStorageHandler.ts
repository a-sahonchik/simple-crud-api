import cluster from 'node:cluster';
import { usersDataStorage } from '../components/dataStorage/UsersDataStorage';

const shareDataStorageWithWorkers = (): void => {
    // @ts-ignore
    for (const workerId in cluster.workers!) {
        // @ts-ignore
        const worker = cluster.workers![workerId]!;

        worker.on('message', async (message) => {
            const { method } = message;

            // @ts-ignore
            if (typeof usersDataStorage[method] === 'function') {
                const parameters = message.parameters ?? [];

                // @ts-ignore
                const result = await usersDataStorage[method](...parameters);

                worker.send({ method, data: result });
            }
        });
    }
};

export { shareDataStorageWithWorkers };
