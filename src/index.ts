import { createServer } from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

createServer((_request, response) => {
    response.writeHead(200, { 'Content-type': 'text/plain' });

    response.end('Hello World');
}).listen(process.env['APP_PORT']);
