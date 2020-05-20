import { useEffect, useState } from 'react';
import * as R from 'ramda';
import { useDispatch } from 'react-redux';

import { useApiMutation, HttpMethod } from '../api';
import { maybe } from '../utils/monads';
import { isUnauthorized } from '../api/utils';
import { useSnackbar } from '../../hooks';

import { useLogout } from './useLogout';

import { updateAccessPass } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useUpdateAccessPass = () => {
  const dispatch = useDispatch();
  const [ updatedValue, setUpdatedValue ] = useState(null);
  const { execute: put, error, reset, isLoading, ...rest } = useApiMutation(
    '/v1/registry/access-passes/{{referenceId}}',
    HttpMethod.Put
  );
  const { execute: executeLogout } = useLogout();
  const { showSnackbar } = useSnackbar();
  const httpResponse = maybe({})(rest.httpResponse);
  const isSuccess = isRequestSuccess(httpResponse.status) || false;

  const execute = async (referenceId, data) => {
    setUpdatedValue(data);
    await put({
      urlPathParams: {
        referenceId,
      },
      requestData: data,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateAccessPass(updatedValue));
      reset();
    }
  }, [isSuccess, updatedValue, reset, dispatch]);
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
    isLoading,
    reset,
    error,
    ...rest,
  };
};
