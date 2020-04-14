import { createAuthorizationHeader } from './createAuthorizationHeader';
import { createAPIKeyHeader } from './createAPIKeyHeader';

export const getConfig = ({ baseConfig, token }) => ({
  ...baseConfig,
  headers: {
    ...baseConfig.headers,
    ...(!baseConfig.public && createAuthorizationHeader(token)),
    ...createAPIKeyHeader(),
  },
});
