import cluster from 'node:cluster';
import { startPrimaryServer, startWorkerServer } from './loadBalancerRouter';

const startMultiServer = (port: number): void => {
    if (cluster.isPrimary) {
        startPrimaryServer(port);
    } else {
        startWorkerServer(port);
    }
};

export { startMultiServer };
