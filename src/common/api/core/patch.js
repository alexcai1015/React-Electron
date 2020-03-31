import { getBaseHeaders } from './getBaseHeaders';

export const patch = (httpClient) => (url, data, config = {}) => {
  const requestConfig = {
    ...config,
    headers: {
      ...config.headers,
      ...getBaseHeaders,
    },
  };

  return httpClient.patch(url, data, requestConfig);
};
