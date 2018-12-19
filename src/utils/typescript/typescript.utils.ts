import {
  DispatchProp,
  GetProps,
  Matching,
} from 'react-redux';
import { ComponentType } from 'react';

export type Diff<T, U> = T extends U ? never : T;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type StringMap = { [key: string]: string };

export const ensureNever = (action: never) => action;

export const isString = <T>(val: T): boolean => typeof val === 'string';

export type ConnectComponentEnhancer<Component, Props, Dispatch = DispatchProp> = ComponentType<Matching<Props & Dispatch, GetProps<Component>>>;
