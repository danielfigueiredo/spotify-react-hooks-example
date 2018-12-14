import { createSelector } from 'reselect';

import { IState } from 'src/app/store/app.types';

import { IUserState } from './user.types';

export const selectUserState = (state: IState): IUserState => state.user;

export const selectIsSessionValid = createSelector<IState, IUserState, boolean>(
  [selectUserState],
  ({ userToken }) => Boolean(userToken && userToken.accessToken),
);
