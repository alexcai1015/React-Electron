import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSnackbar } from '../../hooks';
import { suspendAccessPassById } from '../../store/slices';

import { useUpdateAccessPass } from './useUpdateAccessPass';

export const useSuspendAccessPass = (accessPass) => {
  const { isSuccess, error, reset, ...rest } = useUpdateAccessPass();
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      const { key, referenceId } = accessPass;

      showSnackbar({
        message: `Suspended application with Reference ID: ${referenceId}`,
        severity: 'success',
      });

      dispatch(suspendAccessPassById(key));
      reset();
    }
  }, [dispatch, accessPass, showSnackbar, isSuccess, reset]);

  return {
    reset,
    isSuccess,
    ...rest,
  };
};
