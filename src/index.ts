import * as dotenv from 'dotenv';
import { isApplicationRunsWithParameter } from './utils/commandLineParser';
import { startServer } from './http/router/appRouter';
import { startMultiServer } from './http/router/multiAppRouter';

dotenv.config();

const isMultiApp = isApplicationRunsWithParameter('--multi') ?? false;

if (process.env['APP_PORT'] === undefined) {
    throw new Error('Parameter APP_PORT must be defined in .env');
}

const port = parseInt(process.env['APP_PORT']);

if (isMultiApp) {
    startMultiServer(port);
} else {
    startServer(port);
}
