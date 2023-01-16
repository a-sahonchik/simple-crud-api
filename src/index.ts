import * as dotenv from 'dotenv';
import { startServer } from './http/handler/singleProcessModeHandler';
import { startMultiServer } from './http/handler/multiProcessModeHandler';

dotenv.config();

const isMultiApp = process.argv.includes('--multi') ?? false;

if (process.env['APP_PORT'] === undefined) {
    throw new Error('Parameter APP_PORT must be defined in .env');
}

const port = parseInt(process.env['APP_PORT'], 10);

if (isMultiApp) {
    startMultiServer(port);
} else {
    startServer(port);
}
