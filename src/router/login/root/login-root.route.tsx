import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsSessionValid } from 'src/core/user/user.selectors';
import { IState } from 'src/app/store/app.types';
import { Redirect } from 'react-router-dom';
import { API_CLIENT_ID, getLoginRedirectURL } from 'src/utils/config';
import { ExternalRedirect } from 'src/components/external-redirect/external-redirect.component';

type LoginRootContainerProps = {};
type LoginRootProps = {
  isSessionValid: boolean;
};

export const LoginRoot = ({ isSessionValid }: LoginRootProps) => {
  if (!isSessionValid) {
    return (
      <ExternalRedirect
        to={
          `https://accounts.spotify.com/authorize?client_id=${API_CLIENT_ID}` +
          `&response_type=code&redirect_uri=` +
          encodeURIComponent(getLoginRedirectURL()) +
          `&scope=user-read-private%20user-read-email&state=34fFs29kd09`
        }
      />
    );
  }
  return <Redirect to={'/home'} />;
};

export const LoginRootContainer = connect(
  createStructuredSelector<IState, LoginRootProps>({
    isSessionValid: selectIsSessionValid,
  }),
)(LoginRoot);
