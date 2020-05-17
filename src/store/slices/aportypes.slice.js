/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const { actions, reducer } = createSlice({
  name: 'apor',
  initialState,
  reducers: {
    save: (state, { payload }) => {
      return {
        ...state,
        list: payload,
      };
    },
    remove: () => initialState,
  },
});

export const getAporTypes = (state) => state.aporTypes.list;

export const { save: saveAporTypes } = actions;
export { reducer as aporTypesReducer };
