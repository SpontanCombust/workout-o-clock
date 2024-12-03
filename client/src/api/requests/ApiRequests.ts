export abstract class ApiRequests {

    protected abstract requestMappingBase(): string;


    private static API_SERVER_ADDRESS = 'http://localhost:8080'; //TODO get API address from env

    protected async doRequest<REQ, RES>(
        httpMethod: string, mapping: string, reqBody: REQ, doAuthentication: boolean
    ) : Promise<RES> {
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

        const resp = await fetch(endpoint, {
            method: httpMethod,
            headers,
            body: JSON.stringify(reqBody)
        });

        const respBody = await resp.json();
        if (respBody.ok) {
            return respBody as RES;
        } else {
            throw {
                status: respBody.status,
                body: respBody
            } as ApiException;
        }
    }
}

export interface ApiException {
    status: number,
    body: any
}