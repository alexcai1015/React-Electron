import useFetch from 'use-http';

export const useUpdateAccessPass = ({ accessPassReferenceId }) => {
  // data: accessPass, httpResponse, execute: mutate, ...others }
  const { put: execute, loading: isLoading, ...others } = useFetch({
    path: `/v1/registry/access-passes/${accessPassReferenceId}`,
  });

  return {
    execute,
    isLoading,
    ...others,
  };
};
