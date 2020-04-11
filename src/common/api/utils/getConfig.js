import { createAuthorizationHeader } from './createAuthorizationHeader';

export const getConfig = ({ baseConfig, token }) => {
  if (!token) {
    return baseConfig;
  }

  return {
    ...baseConfig,
    headers: {
      ...baseConfig.headers,
      ...createAuthorizationHeader(token),
    },
  };
};
