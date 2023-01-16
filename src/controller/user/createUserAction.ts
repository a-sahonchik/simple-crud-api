import { constants as httpConstants } from 'node:http2';
import { ActionHandler } from '../../types/ActionHandler';
import { Request } from '../../http/Request';
import { Response } from '../../http/Response';
import { getRequestBody } from '../../http/requestService';
import { validateRequestKeys } from '../../validator/validateRequestKeys';
import { User } from '../../components/users/user.entity';
import { validateUserProperties } from '../../validator/validateUserProperties';
import { usersDataStorage } from '../../components/dataStorage/UsersDataStorage';

const createUserAction: ActionHandler = async (request: Request, response: Response): Promise<void> => {
    const requestBody = await getRequestBody(request);

    const parsedRequestBody = JSON.parse(requestBody);

    validateRequestKeys(parsedRequestBody);

    const user = new User(parsedRequestBody.username, parsedRequestBody.age, parsedRequestBody.hobbies);

    validateUserProperties(user);

    await usersDataStorage.createUser(user);

    response.sendResponse(httpConstants.HTTP_STATUS_CREATED, JSON.stringify(user));
};

export { createUserAction };
