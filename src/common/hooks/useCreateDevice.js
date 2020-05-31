import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  useDispatch
} from 'react-redux';
import * as R from 'ramda';

import {
  useApiMutation,
  HttpMethod
} from '../api';
import { maybe } from '../utils/monads';
import { isUnauthorized } from '../api/utils';
import { useSnackbar } from '../../hooks';
import { useLogout } from './useLogout';

import { addCheckpointDevice } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useCreateDevice = () => {
  const dispatch = useDispatch();
  const {
    execute: mutate,
    reset,
    isLoading,
    error,
    ...others
  } = useApiMutation(
    `/v1/registry/scanner-devices`,
    HttpMethod.Post
  );
  const [ newValue, setNewValue ] = useState(null);

  const { execute: executeLogout } = useLogout();
  const { showSnackbar } = useSnackbar();
  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;

  const execute = useCallback(
    async (data) => {
      setNewValue(data);
        await mutate({
          requestData: data,
        });
      },
      [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(addCheckpointDevice(newValue));
      showSnackbar({ message: 'Device successfully added', severity: 'success' });
      reset();
    }
  }, [dispatch, isSuccess, reset, showSnackbar, newValue])

  useEffect(() => {
    if (error) {
      const errorMessage = R.pathOr('Error occurred', ['response', 'data', 'message'], error);

      if (isUnauthorized(error)) {
        executeLogout();
        return;
      }

      showSnackbar({ message: errorMessage, severity: 'error' });
      reset();
    }
  }, [error, executeLogout, reset, showSnackbar]);

  return {
    execute,
    isLoading,
    isSuccess,
    ...others,
  };
};