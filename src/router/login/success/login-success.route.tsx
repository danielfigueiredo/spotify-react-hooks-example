import React from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { Redirect, RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

import { IUserActions } from 'src/core/user/user.types';
import { setUserTokenAction } from 'src/core/user/token/user-token.actions';
import { IUserTokenState } from 'src/core/user/token/user-token.types';
import { HomeRoutes } from 'src/router/home/home.types';

import { useAuthorizationCodeValidator } from './login-success.hooks';
import { LoginRoutes } from '../login.types';

export type LoginSuccessRouteProps = RouteComponentProps & {
  setUserToken: (userToken: IUserTokenState) => void;
};

export const LoginSuccessRoute = ({ location, setUserToken }: LoginSuccessRouteProps) => {
  const { code: authorizationCode } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const isAuthorizationCodeValid = useAuthorizationCodeValidator(authorizationCode, setUserToken);
  if (isAuthorizationCodeValid === null) {
    return <div>loading...</div>;
  }
  if (isAuthorizationCodeValid) {
    return <Redirect to={{ pathname: HomeRoutes.HOME }} />;
  }
  return <Redirect to={{ pathname: LoginRoutes.ERROR }} />;
};

export const LoginSuccessRouteContainer = connect(
  null,
  (dispatch: Dispatch<IUserActions>) => ({
    setUserToken: (userToken: IUserTokenState) => dispatch(setUserTokenAction(userToken)),
  }),
)(LoginSuccessRoute);
