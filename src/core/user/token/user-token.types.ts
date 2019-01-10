export type IUserTokenState = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
  scope: string;
};

export enum UserActionTypes {
  SET_USER_TOKEN = 'SET_USER_TOKEN',
}

export type ISetUserTokenAction = IPayloadAction<UserActionTypes.SET_USER_TOKEN, IUserTokenState>;

export type IUserTokenActions = ISetUserTokenAction;
