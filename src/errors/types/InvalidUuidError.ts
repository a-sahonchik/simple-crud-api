class InvalidUuidError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidUuidError';
    }
}

export { InvalidUuidError };
