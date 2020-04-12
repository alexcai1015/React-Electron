import { createAuthorizationHeader } from './createAuthorizationHeader';

export const getConfig = ({ baseConfig, token }) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!token || !apiKey) {
    return baseConfig;
  }

  return {
    ...baseConfig,
    headers: {
      ...baseConfig.headers,
      ...createAuthorizationHeader(token, apiKey),
    },
  };
};
