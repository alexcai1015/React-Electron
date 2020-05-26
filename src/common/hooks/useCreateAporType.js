import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useApiMutation, HttpMethod } from '../api';
import { addAporTypes } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useCreateAporType = () => {
  const dispatch = useDispatch();
  const [newApor, setNewApor] = useState(null);
  const { httpResponse, execute: mutate, reset, isLoading, ...others } = useApiMutation(
    `/v1/lookup/apor`,
    HttpMethod.Post
  );

  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;

  const execute = useCallback(
    ({ aporCode, description, approvingAgency }) => {
      const tmpNewApor = {
        aporCode: aporCode.trim().toUpperCase(),
        description: description.trim(),
        approvingAgency: approvingAgency.trim(),
      };
      setNewApor(tmpNewApor);

      mutate({
        requestData: tmpNewApor,
      });
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(addAporTypes(newApor));
      reset();
    }
  }, [dispatch, isSuccess, reset, httpResponse, newApor])

  return {
    execute,
    httpResponse,
    ...others,
  };
};
