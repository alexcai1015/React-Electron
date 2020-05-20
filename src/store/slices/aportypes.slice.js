/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { arrayToDictionary } from '../../common/utils/arrays';

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
        list: payload.sort(),
      };
    },
    remove: () => initialState,
  },
});

export const getAporTypes = (state) => state.aporTypes.list;
export const getAporTypesDictionary = (state) => arrayToDictionary(({ aporCode }) => aporCode)(state.aporTypes.list);

export const { save: saveAporTypes } = actions;
export { reducer as aporTypesReducer };
