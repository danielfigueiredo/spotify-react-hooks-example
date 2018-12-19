import {
  combineReducers,
  Reducer,
} from 'redux';

import { IUserActions, IUserState } from './user.types';
import { userTokenReducer } from './token/user-token.reducer';

export const userReducer: Reducer<IUserState, IUserActions> = combineReducers({
  userToken: userTokenReducer,
});
