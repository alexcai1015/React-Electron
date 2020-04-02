import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useApiQuery } from '../api';
import { saveAccessPasses } from '../../store/slices';

const mapToAccessPass = (data) => ({
  ...data,
  id: String(data.identifierNumber).trim(),
  status: String(data.status).toLowerCase(),
});

export const useGetAccessPasses = () => {
  const dispatch = useDispatch();
  const { data: accessPasses, isLoading, ...others } = useApiQuery('/v1/registry/access-passes');

  const data = Array.isArray(accessPasses) ? accessPasses.map(mapToAccessPass) : [];

  useEffect(() => {
    if (isLoading && data.length) {
      dispatch(saveAccessPasses(data));
    }
  }, [data, dispatch, isLoading]);

  return {
    data,
    isLoading,
    ...others,
  };
};
