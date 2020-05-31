import {
  useCallback,
  useEffect,
  useState
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

import { removeCheckpointDevice } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useDeleteDevice = () => {
  const dispatch = useDispatch();
  const [ deletedId, setDeletedId ] = useState(null);
  const {
    execute: executeDelete,
    reset,
    isLoading,
    error,
    ...others
  } = useApiMutation(
    `/v1/registry/scanner-devices/{{id}}`,
    HttpMethod.Delete
  );

  const { execute: executeLogout } = useLogout();
  const { showSnackbar } = useSnackbar();
  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;
  const execute = useCallback(
    async (id) => {
      setDeletedId(id);
        await executeDelete({
          urlPathParams: {
            id,
          },
        });
      },
      [executeDelete]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeCheckpointDevice(deletedId));
      showSnackbar({ message: 'Device successfully deleted', severity: 'success' });
      reset();
    }
  }, [dispatch, isSuccess, reset, showSnackbar, deletedId])

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