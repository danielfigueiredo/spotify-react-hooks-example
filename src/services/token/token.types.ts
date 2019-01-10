import { IUserTokenState } from 'src/core/user/token/user-token.types';
import { IService } from 'src/services/service.types';

export type ITokenResponseBody = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type ITokenService = IService<string, IUserTokenState>
