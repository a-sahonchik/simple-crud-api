import { createServer } from 'http';
import { constants as httpConstants } from 'http2';
import supertest from 'supertest';
import { handle } from '../src/http/router/appRouter';
import { Request } from '../src/http/Request';
import { Response } from '../src/http/Response';

const request = supertest(createServer(
    { IncomingMessage: Request, ServerResponse: Response },
    async (req: Request, res: Response) => {
        await handle(req, res);
    },
));

describe('CRUD API', () => {
    describe('GET /', () => {
        it('should open main page', async () => {
            const response = await request.get('/api');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_OK);
            expect(response.body).toEqual('Hi there, welcome to CRUD API!');
        });
    });
});
