import { useCallback } from 'react';

import { useApiMutation, HttpMethod } from '../api';

export const useChangePassword = () => {
  const { httpResponse, execute: mutate, isLoading, ...others } = useApiMutation(
    `/v1/users/{{username}}/change-password`,
    HttpMethod.Post
  );

  const execute = useCallback(
    ({ username, currentPassword, password }) => {
      mutate({
        urlPathParams: {
          username,
        },
        requestData: { currentPassword, password },
      });
    },
    [mutate]
  );

  return {
    execute,
    isLoading,
    httpResponse,
    ...others,
  };
};
