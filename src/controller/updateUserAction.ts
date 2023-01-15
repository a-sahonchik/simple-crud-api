import { constants as httpConstants } from 'node:http2';
import { findUserById, updateUser } from '../components/users/users.service';
import { ActionHandler } from '../http/ActionHandler';
import { Request } from '../http/Request';
import { Response } from '../http/Response';
import { getRequestBody } from '../http/requestService';
import { validateRequestKeys } from '../validator/validateRequestKeys';
import { User } from '../components/users/user.entity';
import { validateUserProperties } from '../validator/validateUserProperties';
import { validateUuid } from '../validator/validateUuid';
import { UserNotFoundError } from '../errors/types/UserNotFoundError';
import { USER_NOT_FOUND } from '../components/messages/errorMessages';

const updateUserAction: ActionHandler = async (request: Request, response: Response): Promise<void> => {
    const uuid = request.getUuid();

    await validateUuid(uuid);

    const user = await findUserById(uuid);

    if (user === null) {
        throw new UserNotFoundError(USER_NOT_FOUND);
    }

    const requestBody = await getRequestBody(request);
    const parsedRequestBody = JSON.parse(requestBody);

    validateRequestKeys(parsedRequestBody);

    const newUser = new User(
        parsedRequestBody.username,
        parsedRequestBody.age,
        parsedRequestBody.hobbies,
        uuid,
    );

    validateUserProperties(newUser);

    const updatedUser = await updateUser(user, newUser);

    response.sendResponse(httpConstants.HTTP_STATUS_OK, JSON.stringify(updatedUser));
};

export { updateUserAction };
