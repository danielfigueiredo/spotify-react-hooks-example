import { Config } from './config.types';

export const getProcessEnv = (): any => process.env;

export const configFactory = (getEnvironmentVariables: () => any) => (): Config =>
  getEnvironmentVariables();

export const getConfig = configFactory(getProcessEnv);

export const APP_URL = getConfig().REACT_APP_URL;

export const API_CLIENT_ID = getConfig().REACT_APP_API_CLIENT_ID;

export const API_CLIENT_SECRET = getConfig().REACT_APP_API_CLIENT_SECRET;

export const LOGIN_REDIRECT_PATH = getConfig().REACT_APP_LOGIN_REDIRECT_PATH;

export const getLoginRedirectURL = () => window.location.origin + LOGIN_REDIRECT_PATH;
