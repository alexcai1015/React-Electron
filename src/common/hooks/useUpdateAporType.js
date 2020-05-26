import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useApiMutation, HttpMethod } from '../api';
import { updateAporType } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useUpdateAporType = () => {
  const dispatch = useDispatch();
  const [aporType, setAporType] = useState(null);
  const { httpResponse, execute: mutate, reset, isLoading, ...others } = useApiMutation(
    `/v1/lookup/apor`,
    HttpMethod.Post
  );

  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;

  const execute = useCallback(
    (data) => {
      setAporType(data);

      mutate({
        requestData: data,
      });
    },
    [mutate, setAporType]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateAporType(aporType));
      reset();
    }
  }, [dispatch, isSuccess, reset, httpResponse, aporType]);

  return {
    execute,
    httpResponse,
    ...others,
  };
};
