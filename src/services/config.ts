// import axios, { AxiosRequestConfig, AxiosResponse as OriginalAxiosResponse } from 'axios';
import {FetchOptions, RequestType} from "../types";

// const session = PROJECT_ENV === 'dev'
//     ? config.session
//     : getCookie('auth');
//
// const authDomain = PROJECT_ENV === 'dev'
//     ? config.currentFullUrl
//     : `${window.location.protocol}//${window.location.hostname}`;

// export const httpConfig: AxiosRequestConfig = {
//     timeout: 120000,
//     withCredentials: true,
//     headers: {
//         Pragma: 'no-cache',
//         'Cache-Control': 'no-cache',
//         // 'Authorization-Session': session,
//         // 'Authorization-Domain': authDomain,
//         'Content-Type': 'application/json',
//         source: 'frontend',
//     },
// };

export function createConfig(method: RequestType = 'GET', params: any): FetchOptions {
    return {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: "referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(params)
    }
}

// export const axiosClient = axios.create(httpConfig);
//
// interface AxiosResponse<TResult> extends OriginalAxiosResponse {
//     data: TResult;
// }
// export type AxiosPromise<TResult> = Promise<AxiosResponse<TResult>>
