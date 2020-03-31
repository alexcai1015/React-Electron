import { getBaseHeaders } from './getBaseHeaders';

export const put = (httpClient) => (url, data, config = {}) => {
  const requestConfig = {
    ...config,
    headers: {
      ...config.headers,
      ...getBaseHeaders,
    },
  };

  return httpClient.put(url, data, requestConfig);
};
