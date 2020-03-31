import { getBaseHeaders } from './getBaseHeaders';

export const post = (httpClient) => (url, data, config = {}) => {
  const requestConfig = {
    ...config,
    headers: {
      ...config.headers,
      ...getBaseHeaders,
    },
  };

  return httpClient.post(url, data, requestConfig);
};
