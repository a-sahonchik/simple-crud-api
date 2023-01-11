import * as dotenv from 'dotenv';
import { startServer } from './http/users.router';

dotenv.config();

startServer();
