import { constants as httpConstants } from 'http2';
import supertest from 'supertest';
import { startServer } from '../src/http/appRouter';

const request = supertest(startServer());

describe('Base behavior', () => {
    describe('non-existent endpoint', () => {
        it('should return 404 error on GET', async () => {
            const response = await request.get('/non-existent/endpoint');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
            expect(response.body).toEqual('Page not found.');
        });

        it('should return 404 error on POST', async () => {
            const response = await request.post('/non-existent/endpoint').send('content');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
            expect(response.body).toEqual('Page not found.');
        });

        it('should return 404 error on PUT', async () => {
            const response = await request.put('/non-existent/endpoint').send('content');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
            expect(response.body).toEqual('Page not found.');
        });

        it('should return 404 error on DELETE', async () => {
            const response = await request.delete('/non-existent/endpoint');

            expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
            expect(response.body).toEqual('Page not found.');
        });
    });
});
