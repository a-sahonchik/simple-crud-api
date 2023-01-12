import { userPropertyValidationMap } from './validateUserProperties';

const validateRequestKeys = (request: object): void => {
    const requestKeys = Object.keys(request);

    const validKeys = Object.keys(userPropertyValidationMap);

    const keysMatches = (validKeys.length === requestKeys.length) && validKeys.every((k) => requestKeys.includes(k));

    if (!keysMatches) {
        throw new Error(
            `Request has extra keys. Valid ones are: ${validKeys.join(', ')}.`,
        );
    }
};

export { validateRequestKeys };
