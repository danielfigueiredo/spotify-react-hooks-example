import { createSelector } from 'reselect';

import { selectUserState } from '../user.selectors';

export const selectUserTokenState = createSelector(selectUserState, ({ userToken }) => userToken);

export const selectIsSessionValid = createSelector(
  selectUserTokenState,
  ({ accessToken }) => Boolean(accessToken),
);

export const selectRefreshToken = createSelector(selectUserTokenState, ({ refreshToken }) => refreshToken);

export const selectAccessToken = createSelector(selectUserTokenState, ({ accessToken }) => accessToken);
