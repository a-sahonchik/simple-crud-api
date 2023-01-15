import { validate } from 'uuid';
import { InvalidUuidError } from '../errors/types/InvalidUuidError';
import { INVALID_UUID } from '../components/messages/errorMessages';

const validateUuid = async (uuid: string): Promise<void> => {
    const isUuidValid = validate(uuid);

    if (!isUuidValid) {
        throw new InvalidUuidError(INVALID_UUID);
    }
};

export { validateUuid };
