import React from 'react';
import { Route } from 'react-router-dom';

import { LoginRouteContainer } from './root/login-root.route';
import { LoginSuccessRouteContainer } from './success/login-success.route';
import { LoginErrorRoute } from './error/login-error.route';
import { LoginRoutes } from './login.types';

export const LoginRouter = () => (
  <>
    <Route exact path={LoginRoutes.ROOT} component={LoginRouteContainer} />
    <Route exact path={LoginRoutes.SUCCESS} component={LoginSuccessRouteContainer} />
    <Route exact path={LoginRoutes.ERROR} component={LoginErrorRoute} />
  </>
);
