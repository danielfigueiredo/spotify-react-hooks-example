import React from 'react';

import { LoginGuardRoute } from 'src/router/login/guard/login-guard.route';
import { HomeRoutes } from 'src/router/home/home.types';
import { HomeComponent } from 'src/domains/home/home.component';


export const HomeRouter = () => (
  <LoginGuardRoute exact path={HomeRoutes.HOME}>
    <HomeComponent />
  </LoginGuardRoute>
);
