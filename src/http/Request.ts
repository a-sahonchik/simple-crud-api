import { IncomingMessage } from 'http';
import url from 'node:url';
import { UrlWithStringQuery } from 'url';
import { HttpRequestMethod } from '../components/constants/HttpRequestMethod';

class Request extends IncomingMessage {
    private body: string | undefined;

    public getBody(): string | undefined {
        return this.body;
    }

    public getParsedUrl(): UrlWithStringQuery {
        const requestUrl = this.url;

        if (requestUrl === undefined) {
            throw new Error('URL must be defined.');
        }

        const parsedUrl = url.parse(requestUrl);

        return parsedUrl;
    }

    public getPathname(): string {
        const parsedUrl = this.getParsedUrl();

        const { pathname } = parsedUrl;

        if (pathname === null) {
            throw new Error('Pathname can not be null.');
        }

        return pathname;
    }

    public getUuid(): string {
        const pathname = this.getPathname();

        const uuid = pathname.split('/').slice(-1).toString();

        return uuid;
    }

    public getMethod(): HttpRequestMethod | undefined {
        const { method } = this;

        if (method === undefined) {
            return undefined;
        }

        // @ts-ignore
        const httpRequestMethod = HttpRequestMethod[method];

        return httpRequestMethod;
    }
}

export { Request };
