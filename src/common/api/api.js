import axios from 'axios';

import {
  get as coreGet,
  post as corePost,
  put as corePut,
  del as coreDelete,
  patch as corePatch,
  getBaseHeaders,
} from './core';
import { xsrfTokenInterceptor } from './request-interceptors';

const httpClient = axios;
const baseURL = process.env.REACT_APP_API_URL || window.REACT_APP_API_URL;
httpClient.defaults.baseURL = baseURL;

axios.interceptors.request.use(xsrfTokenInterceptor);

export const httpGet = coreGet(httpClient);
export const httpPost = corePost(httpClient);
export const httpPut = corePut(httpClient);
export const httpDelete = coreDelete(httpClient);
export const httpPatch = corePatch(httpClient);
export { getBaseHeaders, baseURL };
