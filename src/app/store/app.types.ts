import { ReducersMapObject } from 'redux';
import {
  IUserActions,
  IUserState,
} from '../../core/user/user.types';

export type IState = {
  readonly user: IUserState;
};

export type IActions = IUserActions;

export type IReducers = ReducersMapObject<IState, any>;

export type ILoadedState = Partial<IState>;

export type ILoadedReducers = Partial<IReducers>;
