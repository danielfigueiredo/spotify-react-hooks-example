import React from 'react';
import { Redirect } from 'react-router-dom';

import { SPOTIFY_LOGIN_URL } from 'src/utils/config';
import { HomeRoutes } from 'src/router/home/home.types';

import { sessionProviderContainer } from '../utils/session-provider.container';

type LoginRootProps = {
  isSessionValid: boolean;
};

export const LoginRouteContainer = sessionProviderContainer(({ isSessionValid }: LoginRootProps) => {
  if (isSessionValid) {
    return <Redirect to={HomeRoutes.HOME} />;
  }
  if (window) {
    window.location.replace(SPOTIFY_LOGIN_URL);
  }
  return null;
});
