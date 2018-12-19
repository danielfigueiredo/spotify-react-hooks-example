import { ReducersMapObject } from 'redux';
import { PersistPartial } from 'redux-persist';

import { IUserActions, IUserState } from 'src/core/user/user.types';

export type IState = {
  readonly user: IUserState & PersistPartial;
};

export type IActions = IUserActions;

export type IReducers = ReducersMapObject<IState, IActions>;

export type ILoadedState = Partial<IState>;

export type ILoadedReducers = Partial<IReducers>;
