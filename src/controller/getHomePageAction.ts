import { constants as httpConstants } from 'node:http2';
import { ActionHandler } from '../http/ActionHandler';
import { Request } from '../http/Request';
import { Response } from '../http/Response';

const HOME_PAGE_MESSAGE = 'Hi there, welcome to CRUD API!';

const getHomePageAction: ActionHandler = async (_request: Request, response: Response): Promise<void> => {
    response.sendResponse(httpConstants.HTTP_STATUS_OK, HOME_PAGE_MESSAGE);
};

export { getHomePageAction };
