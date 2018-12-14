import 'isomorphic-fetch';

import { StringMap } from '../typescript';
import { Promise } from 'es6-promise';

export const defaultContentTypeHeaders: StringMap = {
  'Content-Type': 'application/json',
};

export const handleResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};

const buildDefaultHeaders = (headers?: StringMap): StringMap => ({
  ...defaultContentTypeHeaders,
  ...headers,
});

const buildDefaultOptions = ({ headers, ...options }: RequestInit): RequestInit => ({
  headers: buildDefaultHeaders(headers as StringMap),
  ...options,
});

export const fetchJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetch(url, buildDefaultOptions(options)).then(handleResponse);

export const getJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetchJSON(url, { method: 'GET', ...options });

export const postJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetchJSON(url, { method: 'POST', ...options });

export const putJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetchJSON(url, { method: 'PUT', ...options });

export const deleteJSON = (url: RequestInfo, options: RequestInit = {}) =>
  fetchJSON(url, { method: 'DELETE', ...options });
