import { ActionHandler } from './ActionHandler';
import { Endpoint } from './Endpoint';
import { HttpRequestMethod } from '../components/constants/HttpRequestMethod';

class Router {
    private readonly endpoints: Endpoint[];

    constructor(endpoints: Endpoint[]) {
        this.endpoints = endpoints;
    }

    public getEndpoints(): Endpoint[] {
        return this.endpoints;
    }

    public findEndpointByPathAndMethod(path: string, method: HttpRequestMethod): Endpoint | undefined {
        const endpoint = this.endpoints.find((e) => e.path === path && e.method === method);

        return endpoint;
    }
}

export { Router, ActionHandler };
