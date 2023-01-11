import http from 'node:http';
import url from 'node:url';
import { findAllUsers } from '../components/users/users.service';

const handler = async (request: http.IncomingMessage, response: http.ServerResponse) => {
    // @ts-ignore
    const parsedUrl = url.parse(request.url, true);

    if (parsedUrl.pathname === '/') {
        response.writeHead(200, { 'Content-type': 'text/plain' });
        response.write('Hello, World!');
        response.end();
    } else if (parsedUrl.pathname === '/users') {
        response.writeHead(200, { 'Content-type': 'application/json' });
        response.end(JSON.stringify(await findAllUsers()));
    } else {
        response.writeHead(404, { 'Content-type': 'text/plain' });
        response.end();
    }
};

const startServer = () => {
    const server = http.createServer(handler).listen(process.env['APP_PORT']);

    return server;
};

export { startServer };
