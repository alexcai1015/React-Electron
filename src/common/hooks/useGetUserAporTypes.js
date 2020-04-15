import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useApiQuery } from '../api';
import { maybe, isHttpResponseSuccess } from '../utils';
import { saveUserAporTypes } from '../../store/slices';

import { useLogout } from './useLogout';

export const useGetUserAporTypes = () => {
  const dispatch = useDispatch();
  const { data: aporTypes, error, query: execute, reset, ...others } = useApiQuery(
    '/v1/users/{{username}}/apor-types'
  );
  const { execute: executeLogout } = useLogout();
  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = isHttpResponseSuccess(httpResponse.status) || false;

  const query = useCallback(
    (username) => {
      execute({
        urlPathParams: {
          username,
        },
      });
    },
    [execute]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveUserAporTypes(aporTypes));
      reset();
    }

    // ! TODO - API isn't returning 401 which should be.
    // For now, let's just logout if there's an error
    if (error) {
      executeLogout();
    }
  }, [aporTypes, dispatch, error, executeLogout, isSuccess, reset]);

  return {
    aporTypes,
    query,
    reset,
    error,
    ...others,
  };
};
