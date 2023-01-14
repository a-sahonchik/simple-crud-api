import http from 'node:http';
import { Request } from './Request';
import { Response } from './Response';
import { transformRequestPathToEndpoint } from './pathTransformer';
import { userRouter } from './usersRouter';

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
        throw new Error('Page not found');
    }
};

const startServer = () => {
    const server = http.createServer(
        { IncomingMessage: Request, ServerResponse: Response },
        async (request: Request, response: Response) => {
            try {
                await handle(request, response);
            } catch (error) {
                response.end((error as Error).toString());
            }
        },
    ).listen(process.env['APP_PORT']);

    return server;
};

export { startServer };
