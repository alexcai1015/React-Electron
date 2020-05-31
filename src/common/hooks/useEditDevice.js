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
import {
  maybe
} from '../utils/monads';
import {
  isUnauthorized
} from '../api/utils';
import {
  useSnackbar
} from '../../hooks';

import {
  useLogout
} from './useLogout';

import { updateCheckpointDevice } from '../../store/slices';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useEditDevice = () => {
  const dispatch = useDispatch();
  const [updatedValue, setUpdatedValue] = useState(null);
  const {
    execute: put,
    reset,
    isLoading,
    error,
    ...others
  } = useApiMutation(
    `/v1/registry/scanner-devices/{{id}}`,
    HttpMethod.Put
  );

  const {
    execute: executeLogout
  } = useLogout();
  const {
    showSnackbar
  } = useSnackbar();
  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = httpResponse ? isRequestSuccess(httpResponse.status) || false : false;
  const execute = useCallback(
    async (id, data) => {
        setUpdatedValue(data);
        await put({
          urlPathParams: {
            id,
          },
          requestData: data,
        });
      },
      [put]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateCheckpointDevice(updatedValue));
      showSnackbar({
        message: 'Device successfully updated',
        severity: 'success'
      });
      reset();
    }
  }, [dispatch, isSuccess, reset, showSnackbar, updatedValue])

  useEffect(() => {
    if (error) {
      const errorMessage = R.pathOr('Error occurred', ['response', 'data', 'message'], error);

      if (isUnauthorized(error)) {
        executeLogout();
        return;
      }

      showSnackbar({
        message: errorMessage,
        severity: 'error'
      });
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