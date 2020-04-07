import { useCallback } from 'react';

import { useApiMutation, HttpMethod } from '../api';

export const useActivateApprover = (username) => {
  const { httpResponse, execute: mutate, isLoading, ...others } = useApiMutation(
    `/v1/users/${username}/activate`,
    HttpMethod.Post
  );

  const execute = useCallback(
    ({ password, activationCode }) => {
      mutate({ requestData: { password, activationCode } });
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
