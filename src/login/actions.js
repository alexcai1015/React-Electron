import { createAction } from '@reduxjs/toolkit';

const setLoading = createAction('isLoading');

const login = () => (dispatch) => {
  dispatch(setLoading(true));

  setTimeout(() => {
    dispatch(setLoading(false));
  }, 2000);
};

export default {
  setLoading,
  login,
};
