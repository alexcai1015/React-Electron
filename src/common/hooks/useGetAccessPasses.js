import { useQuery } from './useApi';

export const useGetAccessPasses = () => {
  const { data: accessPasses, ...others } = useQuery('/registry/access-passes', {
    swrConfig: {
      initialData: [],
    },

    // Transform when the API is ready
    transformer: (data) => data,
  });

  // TODO - check why swrConfig's initial data not working
  // https://github.com/zeit/swr/issues/284
  return {
    data: accessPasses || [],
    ...others,
  };
};
