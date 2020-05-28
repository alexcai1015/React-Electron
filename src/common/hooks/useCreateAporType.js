import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useApiMutation, HttpMethod } from '../api';
import { addAporTypes } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useCreateAporType = () => {
  const dispatch = useDispatch();
  const [newApor, setNewApor] = useState(null);
  const [ createAporIsSuccessResponse, setCreateAporIsSuccessResponse ] = useState(null);
  const { httpResponse, execute: mutate, reset, isLoading, ...others } = useApiMutation(
    `/v1/lookup/apor`,
    HttpMethod.Post
  );

  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;

  const execute = useCallback(
    async ({ aporCode, description, approvingAgency }) => {
      const tmpNewApor = {
        aporCode: aporCode.trim().toUpperCase(),
        description: description.trim(),
        approvingAgency: approvingAgency.trim(),
      };
      setNewApor(tmpNewApor);

      await mutate({
        requestData: tmpNewApor,
      });
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(addAporTypes(newApor));
      setCreateAporIsSuccessResponse(200)
      reset();
    }
  }, [dispatch, isSuccess, reset, newApor])
  
  useEffect(() => {
    if (httpResponse && !(httpResponse.status >= 200 && httpResponse.status < 400)) {
      setCreateAporIsSuccessResponse(httpResponse.status)
    }
  } , [httpResponse])
  const resetCreateAporIsSuccessResponse = () => {
    setCreateAporIsSuccessResponse(null);
  }

  return {
    execute,
    httpResponse,
    createAporIsSuccessResponse,
    resetCreateAporIsSuccessResponse,
    ...others,
  };
};
