import axios, { AxiosRequestConfig, AxiosResponse as OriginalAxiosResponse } from 'axios';

// const session = PROJECT_ENV === 'dev'
//     ? config.session
//     : getCookie('auth');
//
// const authDomain = PROJECT_ENV === 'dev'
//     ? config.currentFullUrl
//     : `${window.location.protocol}//${window.location.hostname}`;

export const httpConfig: AxiosRequestConfig = {
    timeout: 120000,
    withCredentials: true,
    headers: {
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        // 'Authorization-Session': session,
        // 'Authorization-Domain': authDomain,
        'Content-Type': 'application/json',
        source: 'frontend',
    },
};


export const axiosClient = axios.create(httpConfig);

interface AxiosResponse<TResult> extends OriginalAxiosResponse {
    data: TResult;
}
export type AxiosPromise<TResult> = Promise<AxiosResponse<TResult>>
