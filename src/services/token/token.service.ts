import { createService } from '../service';

import { postJSON } from 'src/utils/service';
import { API_CLIENT_ID, API_CLIENT_SECRET, getLoginRedirectURL } from 'src/utils/config';
import { IUserToken } from 'src/core/user/user.types';

import { TokenResponseBody } from './token.types';

const tokenRequester = (authorizationCode: string) => {
  const form = {
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: getLoginRedirectURL(),
  };
  return postJSON('/api/token', {
    headers: {
      Authorization: `Basic ${btoa(`${API_CLIENT_ID}:${API_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(form),
  });
};

const tokenTransformer = (data: TokenResponseBody): IUserToken => ({
  accessToken: data.access_token,
  refreshToken: data.refresh_token,
  expiresIn: data.expires_in,
  scope: data.scope,
  tokenType: data.token_type,
});

export const tokenService = createService(tokenRequester, tokenTransformer);
