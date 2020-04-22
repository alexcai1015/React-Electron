import { getBaseHeaders } from './getBaseHeaders';

export const put = (httpClient) => (url, data, config = {}) => {
  const requestConfig = {
    ...config,
    withCredentials: true,
    headers: {
      ...config.headers,
      ...getBaseHeaders,
    },
  };

  return httpClient.put(url, data, requestConfig);
};
