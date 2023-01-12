import { ValidationError } from '../ValidationError';

interface ValidationRule {
    validateProperty: (propertyName: string, propertyValue: any) => ValidationError[];
}

export { ValidationRule };
