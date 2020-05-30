import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useApiMutation, HttpMethod } from '../api';
import { maybe } from '../utils/monads';
import { isUnauthorized } from '../api/utils';
import { updateAccessPass } from '../../store/slices';

import { useLogout } from './useLogout';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useUpdateAccessPass = () => {
  const dispatch = useDispatch();
  const [updatedValue, setUpdatedValue] = useState(null);
  const { execute: put, error, reset, isLoading, ...rest } = useApiMutation(
    '/v1/registry/access-passes/{{referenceId}}',
    HttpMethod.Put
  );
  const { execute: executeLogout } = useLogout();
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
    }
  }, [isSuccess, updatedValue, dispatch]);

  useEffect(() => {
    if (error) {
      if (isUnauthorized(error)) {
        executeLogout();
      }
    }
  }, [error, executeLogout]);

  return {
    execute,
    isSuccess,
    isLoading,
    reset,
    error,
    ...rest,
  };
};
