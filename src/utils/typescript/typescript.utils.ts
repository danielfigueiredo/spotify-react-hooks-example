export type Diff<T, U> = T extends U ? never : T;

export type StringMap = { [key: string]: string };

export const ensureNever = (action: never) => action;

export const isString = <T>(val: T): boolean => typeof val === 'string';
