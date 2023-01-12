import http from 'node:http';

const getRequestBody = (request: http.IncomingMessage): Promise<string> => new Promise((resolve, reject) => {
    try {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            resolve(body);
        });
    } catch (error) {
        reject(error);
    }
});

export { getRequestBody };
