import { Action } from 'redux';

declare global {
  type IAction<Type, Meta = void> = Action<Type> & {
    readonly meta?: Meta;
  };

  type IPayloadAction<Type, Payload, Meta = void> = IAction<Type, Meta> & {
    readonly payload: Payload;
  };
}
