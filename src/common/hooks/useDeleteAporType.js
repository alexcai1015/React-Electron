import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as R from 'ramda';

import { useApiMutation, HttpMethod } from '../api';
import { saveAporTypes } from '../../store/slices';
import { useSnackbar } from '../../hooks';
import { isUnauthorized } from '../api/utils';

import { useLogout } from './useLogout';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useDeleteAporType = () => {
  const dispatch = useDispatch();

  const { httpResponse, execute: mutate, error, reset, ...others } = useApiMutation(
    `/v1/lookup/apor/{{aporCode}}`,
    HttpMethod.Delete
  );

  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;
  const { execute: executeLogout } = useLogout();
  const { showSnackbar } = useSnackbar();

  const execute = useCallback(
    ({ aporCode }) => {
      if (aporCode)
        mutate({
          urlPathParams: {
            aporCode,
          },
        });
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveAporTypes(httpResponse.data));
      reset();
    }

    if (error) {
      const errorMessage = R.pathOr('Error occurred', ['response', 'data', 'message'], error);

      if (isUnauthorized(error)) {
        executeLogout();
        return;
      }

      showSnackbar({ message: errorMessage, severity: 'error' });
      reset();
    }
  }, [error, dispatch, isSuccess, reset, httpResponse, executeLogout, showSnackbar]);

  return {
    execute,
    httpResponse,
    ...others,
  };
};
