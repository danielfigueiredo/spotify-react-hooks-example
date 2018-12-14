import { createPayloadAction } from '../../app/store';
import {
  ISetUserTokenAction,
  UserActionTypes,
  IUserToken,
} from './user.types';

export const setUserTokenAction = (userToken: IUserToken): ISetUserTokenAction =>
  createPayloadAction(UserActionTypes.SET_USER_TOKEN, userToken);