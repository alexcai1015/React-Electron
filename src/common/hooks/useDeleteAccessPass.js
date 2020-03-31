import { useCallback } from 'react';

import { useApiMutation, HttpMethod } from '../api';

export const useDeleteAccessPass = () => {
  const { data: accessPass, execute: mutate, ...others } = useApiMutation(
    '/v1/registry/access-passes/{{referenceId}}',
    HttpMethod.Delete
  );

  const execute = useCallback(
    (referenceId) => {
      if (referenceId) {
        mutate({
          urlPathParams: {
            referenceId,
          },
        });
      }
    },
    [mutate]
  );

  return {
    data: accessPass || {},
    execute,
    ...others,
  };
};
