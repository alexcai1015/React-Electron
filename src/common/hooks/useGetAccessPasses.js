import { useApiQuery } from '../api';

const mapToAccessPass = (data) => ({
  ...data,
  id: data.identifierNumber,
  status: String(data.status).toLowerCase(),
});

export const useGetAccessPasses = () => {
  const { data: accessPasses, ...others } = useApiQuery('/v1/registry/access-passes');

  const data = Array.isArray(accessPasses) ? accessPasses.map(mapToAccessPass) : [];

  return {
    data,
    ...others,
  };
};
