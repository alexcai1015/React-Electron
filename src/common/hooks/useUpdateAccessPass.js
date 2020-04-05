import useFetch from 'use-http';

export const useUpdateAccessPass = () => {
  // data: accessPass, httpResponse, execute: mutate, ...others }
  const { put: execute, loading: isLoading, ...others } = useFetch({
    path: `/v1/registry/access-passes/`,
  });

  return {
    execute,
    isLoading,
    ...others,
  };
};
