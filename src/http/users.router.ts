import http from 'node:http';
import url from 'node:url';
import { validate } from 'uuid';
import { users, findAllUsers, findUserById } from '../components/users/users.service';
import { User } from '../components/users/user.entity';
import { validateUserProperties } from '../validator/validateUserProperties';
import { validateRequestKeys } from '../validator/validateRequestKeys';
import { getRequestBody } from './requestService';

const requestMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const REGEXP_FLAG_GMI = 'gmi';
const usersWithUuidRegexp = new RegExp('\\/users\\/([^\\s\\/]+)', REGEXP_FLAG_GMI);

const isGet = (method: string) => method === requestMethods.GET;
const isPost = (method: string) => method === requestMethods.POST;
const isPut = (method: string) => method === requestMethods.PUT;

const handler = async (request: http.IncomingMessage, response: http.ServerResponse) => {
    // @ts-ignore
    const parsedUrl = url.parse(request.url, true);
    const { pathname } = parsedUrl;
    const requestMethod = request.method;

    if (pathname === null) {
        throw new Error('Pathname can not be null.');
    }

    if (!requestMethod) {
        throw new Error('Request method must be defined.');
    }

    const uuid = pathname.split('/').slice(-1).toString();

    const isUuidValid = validate(uuid);

    if (pathname === '/' && isGet(requestMethod)) {
        response.writeHead(200, { 'Content-type': 'text/plain' });
        response.end('Hello, World!');
    } else if (pathname === '/users' && isGet(requestMethod)) {
        response.writeHead(200, { 'Content-type': 'application/json' });
        response.end(JSON.stringify(await findAllUsers()));
    } else if (pathname === '/users' && isPost(requestMethod)) {
        const requestBody = await getRequestBody(request);

        try {
            const parsedRequestBody = JSON.parse(requestBody);

            validateRequestKeys(parsedRequestBody);

            const user = new User(parsedRequestBody.username, parsedRequestBody.age, parsedRequestBody.hobbies);

            validateUserProperties(user);

            users.push(user);

            response.writeHead(201, { 'Content-type': 'application/json' });
            response.end(JSON.stringify(user));
        } catch (e) {
            response.writeHead(400, { 'Content-type': 'text/plain' });
            response.end('Invalid request body.');
        }
    } else if (pathname.match(usersWithUuidRegexp) && isUuidValid && isGet(requestMethod)) {
        const user = await findUserById(uuid);

        if (user !== null) {
            response.writeHead(200, { 'Content-type': 'application/json' });
            response.end(JSON.stringify(user));
        } else {
            response.writeHead(404, { 'Content-type': 'text/plain' });
            response.end(`User with uuid ${uuid} does not exist.`);
        }
    } else if (pathname.match(usersWithUuidRegexp) && isUuidValid && isPut(requestMethod)) {
        const user = await findUserById(uuid);

        if (user !== null) {
            try {
                const requestBody = await getRequestBody(request);
                const parsedRequestBody = JSON.parse(requestBody);

                validateRequestKeys(parsedRequestBody);

                const updatedUser = new User(
                    parsedRequestBody.username,
                    parsedRequestBody.age,
                    parsedRequestBody.hobbies,
                    uuid,
                );

                validateUserProperties(updatedUser);

                const userIndex = users.indexOf(user);

                if (userIndex !== -1) {
                    users[userIndex] = updatedUser;
                }

                response.writeHead(200, { 'Content-type': 'application/json' });
                response.end(JSON.stringify(updatedUser));
            } catch (e) {
                response.writeHead(400, { 'Content-type': 'text/plain' });
                response.end('Invalid request body.');
            }
        } else {
            response.writeHead(404, { 'Content-type': 'text/plain' });
            response.end(`User with uuid ${uuid} does not exist.`);
        }
    } else if (pathname.match(usersWithUuidRegexp) && !isUuidValid) {
        response.writeHead(400, { 'Content-type': 'text/plain' });
        response.end('User\'s uuid is not valid.');
    } else {
        response.writeHead(404, { 'Content-type': 'text/plain' });
        response.end('This page doesn\'t exist.');
    }
};

const startServer = () => {
    const server = http.createServer(handler).listen(process.env['APP_PORT']);

    return server;
};

export { startServer };
