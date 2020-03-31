import { useApiMutation, HttpMethod } from '../api';

export const useUpdateAccessPasses = () => {
  const { data: accessPass, execute: mutate, ...others } = useApiMutation(
    '/v1/registry/access-passes/{{referenceId}}',
    HttpMethod.Put
  );

  const execute = (referenceId, data) => {
    if (referenceId && data) {
      mutate({
        urlPathParams: {
          referenceId,
        },
        requestData: data,
      });
    }
  };

  return {
    data: accessPass || {},
    execute,
    ...others,
  };
};
