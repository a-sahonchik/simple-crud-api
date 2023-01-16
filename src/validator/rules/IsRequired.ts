import { ValidationRule } from './ValidationRule';
import { ValidationError } from '../../errors/types/ValidationError';

class IsRequired implements ValidationRule {
    validateProperty(propertyName: string, propertyValue: any): ValidationError[] {
        if (propertyValue === undefined || propertyValue === null) {
            return [new ValidationError(`Property "${propertyName}" is required`)];
        }

        return [];
    }
}

export { IsRequired };
