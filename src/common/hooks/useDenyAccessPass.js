import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as R from 'ramda';

import { useSnackbar } from '../../hooks';
import { denyAccessPassById } from '../../store/slices';

import { useUpdateAccessPass } from './useUpdateAccessPass';

export const useDenyAccessPass = (accessPass) => {
  const { isSuccess, error, reset, ...rest } = useUpdateAccessPass();
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      const { key, referenceId } = accessPass;

      showSnackbar({
        message: `Denied application with Reference ID: ${referenceId}`,
        severity: 'warning',
      });

      dispatch(denyAccessPassById(key));
      reset();
    }

    if (error) {
      const errorMessage = R.pathOr('Error occurred', ['response', 'data', 'message'], error);
      showSnackbar({ message: errorMessage, severity: 'error' });
      reset();
    }
  }, [error, dispatch, reset, accessPass, showSnackbar, isSuccess]);

  return {
    error,
    reset,
    isSuccess,
    ...rest,
  };
};
