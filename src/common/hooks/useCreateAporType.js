import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useApiMutation, HttpMethod } from '../api';
import { addAporTypes } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useCreateAporType = () => {
  const dispatch = useDispatch();
  const [newApor, setNewApor] = useState(null);
  const [ createAporStatusResponse, setCreateAporStatusResponse ] = useState(null);
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
    if (httpResponse && httpResponse.status > 400) {
      setCreateAporStatusResponse(httpResponse.status)
    }
  } , [httpResponse])

  useEffect(() => {
    if (isSuccess) {
      dispatch(addAporTypes(newApor));
      setCreateAporStatusResponse(200)
      reset();
    }
  }, [dispatch, isSuccess, reset, newApor])
  
  const resetCreateAporStatusResponse = () => {
    setCreateAporStatusResponse(null);
  }

  return {
    execute,
    httpResponse,
    createAporStatusResponse,
    resetCreateAporStatusResponse,
    ...others,
  };
};
