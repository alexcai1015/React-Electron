import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useApiQuery } from '../api';
import { saveAccessPasses, getAccessPasses } from '../../store/slices';
import { maybe, createUniqueKeyFromAccessPass } from '../utils';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

const mapToAccessPass = (data, index) => ({
  ...data,
  id: String(data.identifierNumber).trim(),
  status: String(data.status).toLowerCase(),
  key: createUniqueKeyFromAccessPass(data, index),
});

const maybeZero = maybe(0);
const maybeArray = maybe([]);
const maybeObject = maybe({});

export const useGetAccessPasses = () => {
  const dispatch = useDispatch();
  const accessPasses = useSelector(getAccessPasses);
  const { data, isLoading, query, reset, ...others } = useApiQuery('/v1/registry/access-passes');
  const {
    rapidPassList,
    currentPage: page,
    currentPageRows: pageSize,
    totalPages,
    ...otherData
  } = maybeObject(data);

  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = isRequestSuccess(httpResponse.status) || false;

  const list = Array.isArray(rapidPassList) ? rapidPassList.map(mapToAccessPass) : [];

  useEffect(() => {
    if (isSuccess && list.length) {
      dispatch(saveAccessPasses(list));
      reset();
    }
  }, [list, dispatch, isSuccess, reset]);

  useEffect(() => {
    query();
  }, [query]);

  return {
    data: {
      page: maybeZero(page),
      pageSize: maybeZero(pageSize),
      totalPages: maybeZero(totalPages),
      list: maybeArray(accessPasses),
      ...otherData,
    },
    isLoading,
    reset,
    ...others,
  };
};
