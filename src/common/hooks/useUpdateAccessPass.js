import { useMutation, HttpMethod } from './useApi';

export const useUpdateAccessPasses = () => {
  const { data: accessPass, execute: mutate, ...others } = useMutation(
    '/v1/registry/access-passes',
    HttpMethod.PUT,
    {
      // Transform when the API is ready
      transformer: (data) => data,
    }
  );

  const execute = (id, data) => {
    mutate({
      queryParams: {
        id,
      },
      urlResolver: (baseUrl) => {
        return [baseUrl, id].join('/');
      },
      data,
    });
  };

  return {
    data: accessPass || {},
    execute,
    ...others,
  };
};
