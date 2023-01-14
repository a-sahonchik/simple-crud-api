import { validate } from 'uuid';

const validateUuid = async (uuid: string): Promise<void> => {
    const isUuidValid = validate(uuid);

    if (!isUuidValid) {
        throw new Error(
            'User\'s uuid is not valid.',
        );
    }
};

export { validateUuid };
