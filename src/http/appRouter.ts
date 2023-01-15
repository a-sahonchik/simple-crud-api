import http from 'node:http';
import { Request } from './Request';
import { Response } from './Response';
import { transformRequestPathToEndpoint } from './pathTransformer';
import { userRouter } from './usersRouter';
import { handleErrors } from '../errors/errorHandler';
import { HttpNotFoundError } from '../errors/types/HttpNotFoundError';
import { PAGE_NOT_FOUND } from '../components/messages/errorMessages';

const handle = async (request: Request, response: Response): Promise<void> => {
    const method = request.getMethod();

    if (method === undefined) {
        throw new Error('Method can not be null.');
    }

    let handler;

    userRouter.getEndpoints().forEach((endpoint) => {
        const pathname = request.getPathname();

        const transformedPath = transformRequestPathToEndpoint(pathname);

        if (endpoint.path === transformedPath && endpoint.method === method) {
            handler = endpoint.handler;
        }
    });

    if (handler !== undefined) {
        // @ts-ignore
        await handler(request, response);
    } else {
        throw new HttpNotFoundError(PAGE_NOT_FOUND);
    }
};

const startServer = () => {
    const server = http.createServer(
        { IncomingMessage: Request, ServerResponse: Response },
        async (request: Request, response: Response) => {
            try {
                await handle(request, response);
            } catch (error) {
                await handleErrors(error as Error, response);
            }
        },
    ).listen(process.env['APP_PORT']);

    return server;
};

export { startServer, handle };
