import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useApiMutation, HttpMethod } from '../api';

import { saveAporTypes } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useCreateAporType = () => {
  const dispatch = useDispatch();

  const { httpResponse, execute: mutate, reset, isLoading, ...others } = useApiMutation(
    `/v1/lookup/apor`,
    HttpMethod.Post
  );

  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;
  
  const execute = useCallback(
    ({ aporCode, description, approvingAgency }) => {
      mutate({
        requestData: { aporCode: aporCode.trim().toUpperCase(), description : description.trim(), approvingAgency : approvingAgency.trim() },
      });
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveAporTypes(httpResponse.data));
      reset();
    }
  }, [dispatch, isSuccess, reset, httpResponse])

  return {
    execute,
    isLoading,
    httpResponse,
    ...others,
  };
};
