import { ValidationError } from '../../errors/types/ValidationError';

interface ValidationRule {
    validateProperty: (propertyName: string, propertyValue: any) => ValidationError[];
}

export { ValidationRule };
