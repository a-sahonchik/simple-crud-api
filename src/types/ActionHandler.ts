import { Request } from '../http/Request';
import { Response } from '../http/Response';

type ActionHandler = (request: Request, response: Response) => void;

export { ActionHandler };
