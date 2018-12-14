import React, {
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import {
  Redirect,
  RouteComponentProps,
} from 'react-router';
import { Dispatch } from 'redux';

import { setUserTokenAction } from '../../../core/user/user.actions';
import { tokenService } from '../../../services/token/token.service';
import {
  IUserActions,
  IUserToken,
} from '../../../core/user/user.types';
import { LoginRoutes } from '../login.types';


type LoginSuccessRouteProps = RouteComponentProps & {
  setUserToken: (userToken: IUserToken) => void;
};

const LoginSuccessRoute = ({ location, setUserToken}: LoginSuccessRouteProps) => {
  const { code: authorizationCode } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [isAuthorizationCodeValid, setIsAuthorizationCodeValid] = useState<boolean | null>(null);
  useEffect(() => {
    tokenService(authorizationCode)
      .then((data) => {
        setUserToken(data);
        setIsAuthorizationCodeValid(true);
      })
      .catch(() => {
        setIsAuthorizationCodeValid(false);
      });
  },[authorizationCode]);
  if (isAuthorizationCodeValid === null) {
    return <div>loading...</div>;
  }
  if (isAuthorizationCodeValid) {
    return <div>validated</div>;
  }
  return <Redirect to={{ pathname: LoginRoutes.ERROR }} />;
};

export const LoginSuccessRouteContainer = connect(
  null,
  (dispatch: Dispatch<IUserActions>) => ({
    setUserToken: (userToken: IUserToken) => dispatch(setUserTokenAction(userToken)),
  }),
)(LoginSuccessRoute);