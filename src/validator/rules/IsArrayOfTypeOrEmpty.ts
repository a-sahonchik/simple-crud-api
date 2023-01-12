import { ValidationRule } from './ValidationRule';
import { ValidationError } from '../ValidationError';

class IsArrayOfTypeOrEmpty implements ValidationRule {
    private readonly type: string;

    constructor(type: string) {
        this.type = type;
    }

    validateProperty(propertyName: string, propertyValue: any): ValidationError[] {
        if (!Array.isArray(propertyValue)) {
            return [new ValidationError(`Property "${propertyName}" must be of type array.`)];
        }

        const validationErrors: ValidationError[] = [];

        propertyValue.forEach((item: any) => {
            if (typeof item !== this.type) {
                const error = new ValidationError(`Item "${item}" in "${propertyName}" must be of type ${this.type}.`);

                validationErrors.push(error);
            }
        });

        return validationErrors;
    }
}

export { IsArrayOfTypeOrEmpty };
