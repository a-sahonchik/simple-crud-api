import * as dotenv from 'dotenv';
import { startServer } from './http/appRouter';

dotenv.config();

startServer();
