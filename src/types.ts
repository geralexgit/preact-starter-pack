import preact from "preact";

export type Component<P = {}, S = {}, SS = any> = preact.Component<P, S>;
export type ReactElement<P = {}, S = any> = preact.VNode<P>;
export import FunctionComponent = preact.FunctionComponent;
export import ComponentClass = preact.ComponentClass;
export import ComponentType = preact.ComponentType;
export import Context = preact.Context;
export import ReactNode = preact.ComponentChildren;
export type CSSProperties = string | {[key: string]: string | number};
