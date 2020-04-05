import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useApiQuery } from '../api';
import { saveAccessPasses } from '../../store/slices';
import { maybe } from '../utils/monads';

const mapToAccessPass = (data) => ({
  ...data,
  id: String(data.identifierNumber).trim(),
  status: String(data.status).toLowerCase(),
});

export const useGetAccessPasses = () => {
  const dispatch = useDispatch();
  const { data, isLoading, ...others } = useApiQuery('/v1/registry/access-passes');
  const {
    rapidPassList,
    currentPage: page,
    currentPageRows: pageSize,
    totalPages,
    ...otherData
  } = maybe({})(data);
  const maybeZero = maybe(0);

  const list = Array.isArray(rapidPassList) ? rapidPassList.map(mapToAccessPass) : [];

  useEffect(() => {
    if (isLoading && list.length) {
      dispatch(saveAccessPasses(list));
    }
  }, [list, dispatch, isLoading]);

  return {
    data: {
      page: maybeZero(page),
      pageSize: maybeZero(pageSize),
      totalPages: maybeZero(totalPages),
      ...otherData,
    },
    isLoading,
    ...others,
  };
};
