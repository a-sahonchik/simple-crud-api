import { ActionHandler } from '../types/ActionHandler';
import { Endpoint } from '../types/Endpoint';

class Router {
    private readonly endpoints: Endpoint[];

    constructor(endpoints: Endpoint[]) {
        this.endpoints = endpoints;
    }

    public getEndpoints(): Endpoint[] {
        return this.endpoints;
    }
}

export { Router, ActionHandler };
