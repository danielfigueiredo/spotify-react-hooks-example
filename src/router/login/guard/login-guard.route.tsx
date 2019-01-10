import React from 'react';
import {
  Redirect,
  Route,
  RouteProps,
} from 'react-router';

import {
  ISessionProviderProps,
  sessionProviderContainer,
} from 'src/router/login/utils/session-provider.container';
import { LoginRoutes } from 'src/router/login/login.types';

export type LoginGuardedRouteProps = ISessionProviderProps & RouteProps;

export const LoginGuardRoute = sessionProviderContainer(({ isSessionValid, children, ...props }: LoginGuardedRouteProps) => {
  return (
    <Route
      { ...props }
      render={() => {
        if (isSessionValid) {
          return children;
        }
        return <Redirect to={LoginRoutes.ROOT} />;
      }}
    />
  );
});
