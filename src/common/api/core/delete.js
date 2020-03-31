import { getBaseHeaders } from './getBaseHeaders';

export const del = (httpClient) => (url, config = {}) => {
  const requestConfig = {
    ...config,
    headers: {
      ...config.headers,
      ...getBaseHeaders,
    },
  };

  return httpClient.delete(url, requestConfig);
};
