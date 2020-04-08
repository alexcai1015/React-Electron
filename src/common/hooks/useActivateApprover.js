import { useCallback } from 'react';

import { useApiMutation, HttpMethod } from '../api';

export const useActivateApprover = () => {
  const { httpResponse, execute: mutate, isLoading, ...others } = useApiMutation(
    `/v1/users/{{username}}/activate`,
    HttpMethod.Post
  );

  const execute = useCallback(
    ({ username, password, activationCode }) => {
      mutate({
        urlPathParams: {
          username,
        },
        requestData: { username, password, activationCode },
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
