/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { arrayToDictionary } from '../../common/utils/arrays';
import * as R from 'ramda';

const initialState = {
  list: [],
};

const { actions, reducer } = createSlice({
  name: 'apor',
  initialState,
  reducers: {
    add: (state, { payload }) => {
      const list = [...state.list, payload]
      return {
        ...state,
        list
      };
    },
    save: (state, { payload }) => {
      return {
        ...state,
        list: payload
      };
    },
    remove: () => initialState,
  },
});

export const getAporTypes = (state) => (state.aporTypes.list && Array.isArray(state.aporTypes.list)) ? R.sortWith([R.ascend(R.prop('aporCode'))], state.aporTypes.list) : []

export const getAporTypesDictionary = (state) => arrayToDictionary(({ aporCode }) => aporCode)(state.aporTypes.list);

export const { save: saveAporTypes, add: addAporTypes } = actions;
export { reducer as aporTypesReducer };
