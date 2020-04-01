import axios from 'axios';

import {
  get as coreGet,
  post as corePost,
  put as corePut,
  del as coreDelete,
  patch as corePatch,
  getBaseHeaders,
} from './core';

const httpClient = axios;
httpClient.defaults.baseURL = window.REACT_APP_API_URL;

export const httpGet = coreGet(httpClient);
export const httpPost = corePost(httpClient);
export const httpPut = corePut(httpClient);
export const httpDelete = coreDelete(httpClient);
export const httpPatch = corePatch(httpClient);
export { getBaseHeaders };
