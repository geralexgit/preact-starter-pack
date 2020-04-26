import preact from "preact";

export type Component<P = {}, S = {}, SS = any> = preact.Component<P, S>;
export type ReactElement<P = {}, S = any> = preact.VNode<P>;
export import FunctionComponent = preact.FunctionComponent;
export import ComponentClass = preact.ComponentClass;
export import ComponentType = preact.ComponentType;
export import Context = preact.Context;
export import ReactNode = preact.ComponentChildren;
export type CSSProperties = string | {[key: string]: string | number};

// Type definitions for fetch API
// Spec: https://fetch.spec.whatwg.org/
// Polyfill: https://github.com/github/fetch
// Definitions by: Ryan Graham <https://github.com/ryan-codingintrigue>

export interface FetchOptions {
    method?: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD" | "OPTIONS" | "CONNECT";
    headers?: any;
    body?: any;
    mode?: "cors" | "no-cors" | "same-origin";
    credentials?: "omit" | "same-origin" | "include";
    cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
    redirect?: "follow" | "error" | "manual";
    referrer?: string;
    referrerPolicy?: "referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url" | "no-referrer";
    integrity?: any;
}

declare enum ResponseType {
    Basic,
    Cors,
    Default,
    Error,
    Opaque
}

export interface Headers {
    append(name: string, value: string):void;
    delete(name: string):void;
    get(name: string): string;
    getAll(name: string): Array<string>;
    has(name: string): boolean;
    set(name: string, value: string): void;
}

export interface Body {
    bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<JSON>;
    text(): Promise<string>;
}

export interface Response extends Body {
    error(): Response;
    redirect(url: string, status?: number): Response;
    type: ResponseType;
    url: string;
    status: number;
    ok: boolean;
    statusText: string;
    headers: Headers;
    clone(): Response;
}

export interface Window {
    fetch(url: string): Promise<Response>;
    fetch(url: string, options: FetchOptions): Promise<Response>;
}

export type RequestType = "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD" | "OPTIONS" | "CONNECT";
