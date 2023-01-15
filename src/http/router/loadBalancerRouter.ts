import cluster from 'node:cluster';
import { cpus } from 'os';
import http from 'node:http';
import url from 'node:url';
import { startServer } from './appRouter';
import { shareDataStorageWithWorkers } from '../../utils/multiDataStorageHandler';

const cpusCount = cpus().length;

let iteration = 0;

const getNextPort = (startPort: number): number => {
    iteration = iteration === cpusCount ? 1 : iteration + 1;

    return startPort + iteration;
};

const startLoadBalancerServer = (port: number) => {
    const loadBalancerServer = http.createServer((request, response) => {
        const nextPort = getNextPort(port);

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

const startPrimaryServer = (port: number): void => {
    console.log(`Main process is running on port ${port}. Starting workers. please wait...`);

    for (let i = 0; i < cpusCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', () => {
        cluster.fork();
    });

    shareDataStorageWithWorkers();

    startLoadBalancerServer(port);
};

const startWorkerServer = (port: number) => {
    const workerId = cluster.worker!.id;
    const workerPort = port + workerId;

    startServer(workerPort);

    console.log(`Worker ${workerId} running on port ${workerPort}.`);
};

export { startPrimaryServer, startWorkerServer };
