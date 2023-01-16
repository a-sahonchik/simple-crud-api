import { User } from '../components/users/user.entity';
import { ValidationError } from '../errors/types/ValidationError';
import { ValidationRule } from './rules/ValidationRule';
import { IsRequired } from './rules/IsRequired';
import { IsTypeOf } from './rules/IsTypeOf';
import { IsArrayOfTypeOrEmpty } from './rules/IsArrayOfTypeOrEmpty';

const userPropertyValidationMap = {
    username: [
        new IsRequired(),
        new IsTypeOf('string'),
    ],
    age: [
        new IsRequired(),
        new IsTypeOf('number'),
    ],
    hobbies: [
        new IsRequired(),
        new IsArrayOfTypeOrEmpty('string'),
    ],
};

const validateUserProperty = (
    propertyName: string,
    propertyValue: any,
    validationRules: ValidationRule[],
): ValidationError[] => {
    let validationErrors: ValidationError[] = [];

    validationRules.forEach((validationRule) => {
        const errors = validationRule.validateProperty(propertyName, propertyValue);

        if (errors.length > 0) {
            validationErrors = validationErrors.concat(errors);
        }
    });

    return validationErrors;
};

const validateUserProperties = (user: User): void => {
    let validationErrors: ValidationError[] = [];

    Object.entries(userPropertyValidationMap).forEach((propertyValidation) => {
        const propertyName = propertyValidation[0];
        const validationRules = propertyValidation[1];

        // @ts-ignore
        const errors = validateUserProperty(propertyName, user[propertyName], validationRules);

        if (errors.length > 0) {
            validationErrors = validationErrors.concat(errors);
        }
    });

    if (validationErrors.length > 0) {
        throw new ValidationError(validationErrors.map((error) => error.message).join('; '));
    }
};

export { validateUserProperties, userPropertyValidationMap };
