import * as R from 'ramda';

export const isUnauthorized = (httpResponse) => {
  if (!httpResponse) {
    return false;
  }

  const status = R.path(['response', 'status'], httpResponse);
  return R.equals(status, 401);
};
