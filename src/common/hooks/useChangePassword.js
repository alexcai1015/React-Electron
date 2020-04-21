import { useCallback } from 'react';

import { useApiMutation, HttpMethod } from '../api';

export const useChangePassword = () => {
  const { httpResponse, execute: mutate, isLoading, ...others } = useApiMutation(
    `/v1/users/{{username}}/change-password`,
    HttpMethod.Post
  );

  const execute = useCallback(
    ({ username, currentPassword, newPassword }) => {
      mutate({
        urlPathParams: {
          username,
        },
        requestData: { currentPassword, newPassword },
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
