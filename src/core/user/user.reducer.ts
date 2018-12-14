import { Reducer } from 'redux';
import {
  IUserActions,
  UserActionTypes,
  IUserState,
} from './user.types';


export const initialUserState: IUserState = {
  userToken: {
    accessToken: '',
    tokenType: '',
    expiresIn: 0,
    refreshToken: '',
    scope: '',
  }
};

export const userReducer: Reducer<IUserState, IUserActions> = (state = initialUserState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_TOKEN:
      return { ...state, userToken: action.payload };
    default:
      return state;
  }
};
