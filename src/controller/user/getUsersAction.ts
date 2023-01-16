import { constants as httpConstants } from 'node:http2';
import { usersDataStorage } from '../../components/dataStorage/UsersDataStorage';
import { ActionHandler } from '../../types/ActionHandler';
import { Request } from '../../http/Request';
import { Response } from '../../http/Response';

const getUsersAction: ActionHandler = async (_request: Request, response: Response): Promise<void> => {
    const users = await usersDataStorage.findAllUsers();

    response.sendResponse(httpConstants.HTTP_STATUS_OK, JSON.stringify(users));
};

export { getUsersAction };
