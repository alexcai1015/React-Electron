import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useApiMutation, HttpMethod } from '../api';
import { removeAporType } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useDeleteAporType = () => {
  const dispatch = useDispatch();
  const [deleteAporCode, setDeleteAporCode] = useState(null);

  const { httpResponse, execute: mutate, reset, isLoading, ...others } = useApiMutation(
    `/v1/lookup/apor/{{aporCode}}`,
    HttpMethod.Delete
  );

  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;
  const execute = useCallback(
    ({ aporCode }) => {
      mutate({
        urlPathParams: {
          aporCode,
        },
      });

      setDeleteAporCode(aporCode);
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeAporType(deleteAporCode));
      reset();
    }
  }, [dispatch, isSuccess, reset, deleteAporCode]);

  return {
    execute,
    httpResponse,
    ...others,
  };
};
