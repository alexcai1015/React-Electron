import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSnackbar } from '../../hooks';
import { denyAccessPassById } from '../../store/slices';

import { useUpdateAccessPass } from './useUpdateAccessPass';

export const useDenyAccessPass = (accessPass) => {
  const { isSuccess, reset, ...rest } = useUpdateAccessPass();
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
  }, [dispatch, reset, accessPass, showSnackbar, isSuccess]);

  return {
    reset,
    isSuccess,
    ...rest,
  };
};
