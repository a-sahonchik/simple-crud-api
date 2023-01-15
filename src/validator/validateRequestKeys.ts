import { userPropertyValidationMap } from './validateUserProperties';
import { HttpBadRequestError } from '../errors/types/HttpBadRequestError';

const validateRequestKeys = (request: object): void => {
    const requestKeys = Object.keys(request);

    const validKeys = Object.keys(userPropertyValidationMap);

    const keysMatches = (validKeys.length === requestKeys.length) && validKeys.every((k) => requestKeys.includes(k));

    if (!keysMatches) {
        throw new HttpBadRequestError(
            `Request has extra or less keys. Valid ones are: ${validKeys.join(', ')}.`,
        );
    }
};

export { validateRequestKeys };
