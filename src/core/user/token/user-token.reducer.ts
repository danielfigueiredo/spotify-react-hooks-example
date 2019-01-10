import { Reducer } from 'redux';
import { IUserTokenActions, UserActionTypes, IUserTokenState } from './user-token.types';

export const initialUserState: IUserTokenState = {
  accessToken: '',
  tokenType: '',
  expiresIn: 0,
  refreshToken: '',
  scope: '',
};

export const userTokenReducer: Reducer<IUserTokenState, IUserTokenActions> = (
  state = initialUserState,
  action,
) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
