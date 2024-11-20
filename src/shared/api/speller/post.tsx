import axios, { AxiosResponse } from 'axios';
import * as querystring from 'querystring';

const ETIMEDOUT = 'Request timed out.';

interface PostParams {
    url: string;
    form: { [key: string]: any };
    requestLimit?: number;
    timeout?: number;
}

interface Callback {
    (error: Error | null, response?: AxiosResponse, json?: any): void;
}

function post(params: PostParams, callback: Callback): void {
    const form = querystring.stringify(params.form);
    const options = {
        method: 'POST',
        url: params.url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(form)
        },
        data: form,
        timeout: params.timeout || 5000 // Устанавливаем тайм-аут по умолчанию
    };

    axios(options)
        .then((response: AxiosResponse) => {
            let json;
            try {
                json = response.data;
            } catch (e) {
                callback(
                    new Error(
                        'Yandex.Speller API:\n-------------------\n' +
                        'Status code: ' + response.status + '\n' +
                        'Response: ' + JSON.stringify(response.data) + '\n' +
                        'JSON.parse(Response): ' + e + '\n'
                    )
                );
                return;
            }
            callback(null, response, json);
        })
        .catch((error) => {
            if (error.code === 'ECONNABORTED') {
                callback(new Error(ETIMEDOUT));
            } else {
                callback(error);
            }
        });
}

function postRetryingDecorator(params: PostParams, callback: Callback): void {
    let tryNumber = 1;
    let callbackOrigin = callback;
    let paramsOrigin = params;
    let requestLimit = params.requestLimit || 2;
    let timeout = params.timeout || 500;

    let callbackMock = function(this: void, err: Error | null, res?: AxiosResponse, json?: any) {
        if (err && err.message === ETIMEDOUT && tryNumber <= requestLimit) {
            tryNumber++;
            setTimeout(function() { post(paramsOrigin, callbackMock); }, timeout);
            return;
        }

        callbackOrigin(err, res, json);
    };

    post(params, callbackMock);
}

export default postRetryingDecorator;
