import { ValidationRule } from './ValidationRule';
import { ValidationError } from '../ValidationError';

class IsTypeOf implements ValidationRule {
    private readonly type: string;

    constructor(type: string) {
        this.type = type;
    }

    validateProperty(propertyName: string, propertyValue: any): ValidationError[] {
        if (typeof propertyValue !== this.type) {
            return [new ValidationError(`Property "${propertyName}" must be of type ${this.type}.`)];
        }

        return [];
    }
}

export { IsTypeOf };
