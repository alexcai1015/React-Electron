import { createReducer } from '@reduxjs/toolkit';

import actions from './actions';

const initialState = {
  isLoading: false,
};

export default createReducer(initialState, {
  [actions.setLoading]: (_, action) => ({ isLoading: action.payload }),
});
