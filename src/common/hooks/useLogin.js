import { useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import * as R from 'ramda';

import { useApiMutation, HttpMethod } from '../api';
import { saveUser } from '../../store/slices';
import { maybe } from '../utils/monads';

const mapToUser = (data) => ({
  token: data.accessCode,
});

export const useLogin = () => {
  const dispatch = useDispatch();
  const { data: user, httpResponse, execute: mutate, isLoading, ...others } = useApiMutation(
    '/v1/users/auth',
    HttpMethod.Post
  );

  const data = R.pipe(maybe({}), mapToUser)(user);

  const execute = useCallback(
    ({ username, password }) => {
      if (username && password) {
        mutate({
          requestData: {
            username,
            password,
          },
        });
      }
    },
    [mutate]
  );

  useEffect(() => {
    if (httpResponse && httpResponse.status === 200) {
      // username is not returned; only accessCode
      dispatch(saveUser(data));
    }
  }, [data, dispatch, httpResponse, isLoading]);

  return {
    data,
    execute,
    isLoading,
    httpResponse,
    ...others,
  };
};
