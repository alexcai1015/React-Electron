import { useEffect /* useState */ } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useApiQuery } from '../api';
import { maybe } from '../utils';
import { saveAporTypes, getAporTypes } from '../../store/slices';
import { isUnauthorized } from '../api/utils';

import { useLogout } from './useLogout';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

const maybeArray = maybe([]);

// const maybeObject = maybe({});

export const useGetAporTypes = () => {
  const dispatch = useDispatch();
  const aporTypeList = useSelector(getAporTypes);

  const { data, error, isLoading, query, reset, ...others } = useApiQuery('/v1/lookup/apor');
  const { execute: executeLogout } = useLogout();

  const list = maybeArray(data);

  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = isRequestSuccess(httpResponse.status) || false;

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveAporTypes(list));
      reset();
    }

    if (error && isUnauthorized(error)) {
      executeLogout();
    }
  }, [list, dispatch, isSuccess, reset, error, executeLogout]);

  return {
    data: {
      list: maybeArray(aporTypeList),
    },
    isLoading,
    reset,
    query,
    isSuccess,
    error,
    ...others,
  };
};
