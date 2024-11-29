export class ResponseEntity<T> extends Response {
    json(): Promise<T> {
        return super.json() as Promise<T>;
    }
}

export abstract class ApiRequests {

    protected abstract requestMappingBase(): string;


    private static API_SERVER_ADDRESS = 'http://localhost:8080'; //TODO get API address from env

    protected async doRequest<REQ, RES>(
        httpMethod: string, mapping: string, body: REQ, doAuthentication: boolean
    ) : Promise<ResponseEntity<RES>> {
        const endpoint = ApiRequests.API_SERVER_ADDRESS + this.requestMappingBase() + mapping;
        const accessToken = undefined; //TODO store and fetch credentials
        
        var headers: HeadersInit_ = {
            "Content-Type": "application/json"
        };

        if (doAuthentication && accessToken != undefined) {
            headers = {
                ...headers,
                "Authorization": `Bearer ${accessToken}`
            };
        }

        return await fetch(endpoint, {
            method: httpMethod,
            headers,
            body: JSON.stringify(body)
        });
    }
}