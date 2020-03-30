import { useMutation, HttpMethod } from './useApi';

export const useDeleteAccessPass = () => {
  const { data: accessPass, execute: mutate, ...others } = useMutation(
    '/v1/registry/access-passes',
    HttpMethod.DELETE,
    {
      // Transform when the API is ready
      transformer: (data) => data,
    }
  );

  const execute = (id) => {
    if (id) {
      mutate({
        queryParams: {
          id,
        },
      });
    }
  };

  return {
    data: accessPass || {},
    execute,
    ...others,
  };
};
