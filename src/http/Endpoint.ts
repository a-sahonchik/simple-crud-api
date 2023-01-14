import { HttpRequestMethod } from '../components/constants/HttpRequestMethod';
import { ActionHandler } from './ActionHandler';

type Endpoint = {
    path: string,
    method: HttpRequestMethod,
    handler: ActionHandler
};

export { Endpoint };
