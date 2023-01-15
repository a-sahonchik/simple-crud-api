import { constants as httpConstants } from 'node:http2';
import { Response } from '../http/Response';
import { UserNotFoundError } from './types/UserNotFoundError';
import { InvalidUuidError } from './types/InvalidUuidError';
import { HttpBadRequestError } from './types/HttpBadRequestError';
import { ValidationError } from './types/ValidationError';
import { HttpNotFoundError } from './types/HttpNotFoundError';
import { INTERNAL_SERVER_ERROR } from '../components/messages/errorMessages';

const handleErrors = async (error: Error, response: Response) => {
    switch (error.constructor) {
        case UserNotFoundError:
        case HttpNotFoundError:
            response.sendResponse(httpConstants.HTTP_STATUS_NOT_FOUND, error.message);
            break;
        case InvalidUuidError:
        case HttpBadRequestError:
        case ValidationError:
        case SyntaxError:
            response.sendResponse(httpConstants.HTTP_STATUS_BAD_REQUEST, error.message);
            break;
        default:
            response.sendResponse(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
    }
};

export { handleErrors };
