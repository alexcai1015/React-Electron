import { useCallback } from 'react';

import { useApiMutation, HttpMethod } from '../api';

export const useChangePassword = () => {
  const { httpResponse, execute: mutate, isLoading, ...others } = useApiMutation(
    `/v1/users/change-password`,
    HttpMethod.Post
  );

  const execute = useCallback(
    ({ currentPassword, password }) => {
      mutate({
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
