export declare type Anything = string | number | boolean | null | undefined | Anything[] | {
    [key: string]: Anything;
};
export interface UnknownExtra {
    [key: string]: Anything;
}
export interface Serializable {
    [key: string]: Anything;
}
