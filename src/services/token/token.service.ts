// import { Promise } from 'es6-promise';

import { postJSON } from 'src/utils/service';
import { API_CLIENT_ID, API_CLIENT_SECRET, getLoginRedirectURL } from 'src/utils/config';
import { IUserTokenState } from 'src/core/user/token/user-token.types';

import { createService } from '../service';
import { ITokenService, ITokenResponseBody } from './token.types';

export type IAccessTokenRequestBody = {
  grant_type: string;
  code: string;
  redirect_uri: string;
};

export type IRefreshTokenRequestBody = {
  grant_type: string;
  refresh_token: string;
};

export type ITokenRequestBody = IAccessTokenRequestBody | IRefreshTokenRequestBody;

const fetchToken = (body: ITokenRequestBody) => postJSON('/api/token', {
  headers: {
    Authorization: `Basic ${btoa(`${API_CLIENT_ID}:${API_CLIENT_SECRET}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams(body),
});

const tokenRequester = (authorizationCode: string) => {
  const form: IAccessTokenRequestBody = {
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: getLoginRedirectURL(),
  };

  return fetchToken(form);
};

const tokenTransformer = (data: ITokenResponseBody): IUserTokenState => ({
  accessToken: data.access_token,
  refreshToken: data.refresh_token,
  expiresIn: data.expires_in,
  scope: data.scope,
  tokenType: data.token_type,
});

const refreshTokenRequester = (refreshToken: string) => {
  const form: IRefreshTokenRequestBody = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  return fetchToken(form);
};

export const tokenService: ITokenService = createService(tokenRequester, tokenTransformer);

export const refreshTokenService: ITokenService = createService(refreshTokenRequester, tokenTransformer);
