import {
  IUserTokenActions,
  IUserTokenState,
} from './token/user-token.types';

export type IUserState = {
  userToken: IUserTokenState;
};

export type IUserActions = IUserTokenActions;
