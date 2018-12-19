import { Config } from './config.utils.types';

export const getProcessEnv = (): any => process.env;

export const configFactory = (getEnvironmentVariables: () => any) => (): Config =>
  getEnvironmentVariables();

export const getConfig = configFactory(getProcessEnv);


export const API_CLIENT_ID = getConfig().REACT_APP_SPOTIFY_API_CLIENT_ID;

export const API_CLIENT_SECRET = getConfig().REACT_APP_SPOTIFY_API_CLIENT_SECRET;

export const LOGIN_REDIRECT_PATH = getConfig().REACT_APP_SPOTIFY_LOGIN_REDIRECT_PATH;

export const SPOTIFY_ACCOUNTS_BASE_URL = getConfig().REACT_APP_SPOTIFY_ACCOUNTS_BASE_URL;

export const SPOTIFY_API_BASE_URL = getConfig().REACT_APP_SPOTIFY_API_BASE_URL;

export const getLoginRedirectURL = () => window.location.origin + LOGIN_REDIRECT_PATH;

export const SPOTIFY_LOGIN_URL = `${SPOTIFY_ACCOUNTS_BASE_URL}/authorize?client_id=${API_CLIENT_ID}` +
  `&response_type=code&redirect_uri=${encodeURIComponent(getLoginRedirectURL())}` +
  `&scope=user-read-private%20user-read-email&state=34fFs29kd09`;