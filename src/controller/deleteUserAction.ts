import { constants as httpConstants } from 'node:http2';
import { deleteUser, findUserById } from '../components/users/users.service';
import { ActionHandler } from '../http/ActionHandler';
import { Request } from '../http/Request';
import { Response } from '../http/Response';
import { validateUuid } from '../validator/validateUuid';
import { UserNotFoundError } from '../errors/types/UserNotFoundError';
import { USER_NOT_FOUND } from '../components/messages/errorMessages';

const deleteUserAction: ActionHandler = async (request: Request, response: Response): Promise<void> => {
    const uuid = request.getUuid();

    await validateUuid(uuid);

    const user = await findUserById(uuid);

    if (user === null) {
        throw new UserNotFoundError(USER_NOT_FOUND);
    }

    await deleteUser(user);

    response.sendResponse(httpConstants.HTTP_STATUS_OK, `User ${uuid} was deleted successfully.`);
};

export { deleteUserAction };
