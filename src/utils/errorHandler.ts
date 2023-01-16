import { constants as httpConstants } from 'node:http2';
import { Response } from '../http/Response';
import { UserNotFoundError } from '../errors/types/UserNotFoundError';
import { InvalidUuidError } from '../errors/types/InvalidUuidError';
import { HttpBadRequestError } from '../errors/types/HttpBadRequestError';
import { ValidationError } from '../errors/types/ValidationError';
import { HttpNotFoundError } from '../errors/types/HttpNotFoundError';
import { INTERNAL_SERVER_ERROR } from '../components/messages/errorMessages';

const handleErrors = async (error: Error, response: Response) => {
    switch (error.constructor) {
        case UserNotFoundError:
        case HttpNotFoundError:
            response.sendResponse(httpConstants.HTTP_STATUS_NOT_FOUND, JSON.stringify(error.message));
            break;
        case InvalidUuidError:
        case HttpBadRequestError:
        case ValidationError:
        case SyntaxError:
            response.sendResponse(httpConstants.HTTP_STATUS_BAD_REQUEST, JSON.stringify(error.message));
            break;
        default:
            response.sendResponse(
                httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                JSON.stringify(INTERNAL_SERVER_ERROR),
            );
    }
};

export { handleErrors };
