import useFetch from 'use-http';
import { baseURL } from '../api';

export const useUpdateAccessPass = () => {
  // data: accessPass, httpResponse, execute: mutate, ...others }
  const { put: execute, loading: isLoading, ...others } = useFetch({
    url: baseURL,
    path: `/v1/registry/access-passes/`,
  });

  return {
    execute,
    isLoading,
    ...others,
  };
};
