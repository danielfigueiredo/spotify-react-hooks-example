export type IUserToken = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
  scope: string;
};

export type IUserState = {
  userToken: IUserToken;
};

export enum UserActionTypes {
  SET_USER_TOKEN = 'SET_USER_TOKEN',
}

export type ISetUserTokenAction = IPayloadAction<UserActionTypes.SET_USER_TOKEN, IUserToken>;

export type IUserActions = ISetUserTokenAction;
