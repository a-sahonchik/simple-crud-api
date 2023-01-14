import { constants as httpConstants } from 'node:http2';
import { findUserById } from '../components/users/users.service';
import { ActionHandler } from '../http/ActionHandler';
import { Request } from '../http/Request';
import { Response } from '../http/Response';
import { validateUuid } from '../validator/validateUuid';

const getUserAction: ActionHandler = async (request: Request, response: Response): Promise<void> => {
    const uuid = request.getUuid();

    await validateUuid(uuid);

    const user = await findUserById(uuid);

    if (user === null) {
        response.sendResponse(httpConstants.HTTP_STATUS_NOT_FOUND, `User with uuid ${uuid} does not exist.`);
    } else {
        response.sendResponse(httpConstants.HTTP_STATUS_OK, JSON.stringify(user));
    }
};

export { getUserAction };
