import { constants as httpConstants } from 'node:http2';
import { deleteUser, findUserById } from '../components/users/users.service';
import { ActionHandler } from '../http/ActionHandler';
import { Request } from '../http/Request';
import { Response } from '../http/Response';
import { validateUuid } from '../validator/validateUuid';

const deleteUserAction: ActionHandler = async (request: Request, response: Response): Promise<void> => {
    const uuid = request.getUuid();

    await validateUuid(uuid);

    const user = await findUserById(uuid);

    if (user === null) {
        response.sendResponse(httpConstants.HTTP_STATUS_NOT_FOUND, `User with uuid ${uuid} does not exist.`);
        return;
    }

    await deleteUser(user);

    response.sendResponse(httpConstants.HTTP_STATUS_OK, `User ${uuid} was deleted successfully.`);
};

export { deleteUserAction };
