import { createPayloadAction } from 'src/app/store/app.actions';

import { ISetUserTokenAction, UserActionTypes, IUserTokenState } from './user-token.types';

export const setUserTokenAction = (userToken: IUserTokenState): ISetUserTokenAction =>
  createPayloadAction(UserActionTypes.SET_USER_TOKEN, userToken);
