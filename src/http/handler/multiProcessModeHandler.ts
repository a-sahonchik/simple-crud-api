import cluster from 'node:cluster';
import http from 'node:http';
import url from 'node:url';
import { cpus } from 'os';
import { shareDataStorageWithWorkers } from '../../utils/multiDataStorageHandler';
import { startServer } from './singleProcessModeHandler';

let iteration = 0;

const getNextPort = (startPort: number): number => {
    if (iteration === cpus().length) {
        iteration = 1;
    } else {
        iteration += 1;
    }

    return startPort + iteration;
};

const listenLoadBalancerServer = (port: number) => {
    const loadBalancerServer = http.createServer((request, response) => {
        const nextPort = getNextPort(port);

        // eslint-disable-next-line no-console
        console.log(`Proxying request ${request.method} ${request.url} to port ${nextPort}.`);

        if (request.url === undefined) {
            throw new Error('URL must be defined.');
        }

        const requestOptions = {
            ...url.parse(request.url),
            port: nextPort,
            headers: request.headers,
            method: request.method,
        };

        request.pipe(
            http.request(requestOptions, (message) => {
                response.writeHead(message.statusCode!, message.headers);
                message.pipe(response);
            }),
        );
    });

    loadBalancerServer.listen(port);
};

const startMainServer = (port: number): void => {
    // eslint-disable-next-line no-console
    console.log(`Main process is running on port ${port}. Starting workers. please wait...`);

    for (let i = 0; i < cpus().length; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', () => {
        cluster.fork();
    });

    shareDataStorageWithWorkers();

    listenLoadBalancerServer(port);
};

const startWorkerServer = (port: number) => {
    const workerId = cluster.worker!.id;
    const workerPort = port + workerId;

    startServer(workerPort);

    // eslint-disable-next-line no-console
    console.log(`Worker ${workerId} running on port ${workerPort}.`);
};

const startMultiServer = (port: number): void => {
    if (cluster.isPrimary) {
        startMainServer(port);
    } else {
        startWorkerServer(port);
    }
};

export { startMultiServer };
