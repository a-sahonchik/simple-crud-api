import { IncomingMessage, ServerResponse } from 'http';

class Response<Request extends IncomingMessage = IncomingMessage> extends ServerResponse<Request> {
    public sendResponse(statusCode: number, content: string): void {
        this.writeHead(statusCode, {
            'Content-Type': 'application/json',
        });

        this.end(content);
    }
}

export { Response };
