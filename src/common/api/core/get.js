import { getBaseHeaders } from './getBaseHeaders';

export const get = (httpClient) => (url, config = {}) => {
  const requestConfig = {
    ...config,
    headers: {
      ...config.headers,
      ...getBaseHeaders,
    },
  };

  return httpClient.get(url, requestConfig);
};
