import { useEffect } from 'react';
import * as R from 'ramda';

import { useApiMutation, HttpMethod } from '../api';
import { maybe } from '../utils/monads';
import { isUnauthorized } from '../api/utils';
import { useSnackbar } from '../../hooks';

import { useLogout } from './useLogout';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useUpdateAccessPass = () => {
  const { execute: put, error, reset, ...rest } = useApiMutation(
    '/v1/registry/access-passes/{{referenceId}}',
    HttpMethod.Put
  );
  const { execute: executeLogout } = useLogout();
  const { showSnackbar } = useSnackbar();
  const httpResponse = maybe({})(rest.httpResponse);
  const isSuccess = isRequestSuccess(httpResponse.status) || false;

  const execute = (referenceId, data) => {
    put({
      urlPathParams: {
        referenceId,
      },
      requestData: data,
    });
  };

  useEffect(() => {
    if (error) {
      const errorMessage = R.pathOr('Error occurred', ['response', 'data', 'message'], error);

      if (isUnauthorized(error)) {
        executeLogout();
        return;
      }

      showSnackbar({ message: errorMessage, severity: 'error' });
      reset();
    }
  }, [error, executeLogout, reset, showSnackbar]);

  return {
    execute,
    isSuccess,
    reset,
    error,
    ...rest,
  };
};
