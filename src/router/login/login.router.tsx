import React from 'react';
import {
  Route,
} from 'react-router-dom';

import { LoginSuccessRouteContainer } from './success/login-success.route';
import { LoginRoutes } from './login.types';

export const LoginRouter = () => (
  <>
    <Route 
      exact 
      path={LoginRoutes.SUCCESS} 
      component={LoginSuccessRouteContainer}
    />
    <Route
      exact
      path={LoginRoutes.ERROR}
      component={() => <div>Ops, something went wrong with your login</div>}
    />
  </>
);
