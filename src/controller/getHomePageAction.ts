import { constants as httpConstants } from 'node:http2';
import { ActionHandler } from '../http/ActionHandler';
import { Request } from '../http/Request';
import { Response } from '../http/Response';
import { HOME_PAGE_MESSAGE } from '../components/messages/responseMessages';

const getHomePageAction: ActionHandler = async (_request: Request, response: Response): Promise<void> => {
    response.sendResponse(httpConstants.HTTP_STATUS_OK, JSON.stringify(HOME_PAGE_MESSAGE));
};

export { getHomePageAction };
