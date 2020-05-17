import { useCallback } from 'react';

import { useApiMutation, HttpMethod } from '../api';

export const useCreateAporType = () => {
  const { httpResponse, execute: mutate, isLoading, ...others } = useApiMutation(
    `/v1/lookup/apor`,
    HttpMethod.Post
  );

  const execute = useCallback(
    ({ aporCode, description, approvingAgency }) => {
      mutate({
        requestData: { aporCode, description, approvingAgency },
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
