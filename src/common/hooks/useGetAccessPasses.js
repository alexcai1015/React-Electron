import { useQuery } from './useApi';

const mapToAccessPass = (data) => ({
  ...data,
  id: data.identifierNumber,
  status: String(data.status).toLowerCase(),
});

export const useGetAccessPasses = () => {
  const { data: accessPasses, ...others } = useQuery('/registry/access-passes', {
    swrConfig: {
      initialData: [],
    },
    transformer: (data) => data.map(mapToAccessPass),
  });

  // TODO - check why swrConfig's initial data not working
  // https://github.com/zeit/swr/issues/284
  return {
    data: accessPasses || [],
    ...others,
  };
};
