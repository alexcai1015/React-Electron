/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as R from 'ramda';

const initialState = {
  list: [],
};

const { actions, reducer } = createSlice({
  name: 'checkpointDevice',
  initialState,
  reducers: {
    add: (state, { payload }) => {
      const list = [...state.list, payload];
      return {
        ...state,
        list,
      };
    },
    update: (state, { payload }) => {
      const list = R.map(({ id, ...others }) =>
        id === payload.id ? payload : { id, ...others }
      )(state.list);

      return {
        ...state,
        list,
      };
    },
    remove: (state, { payload }) => {
      const list = R.filter(({ id }) => id !== payload, state.list);

      return {
        ...state,
        list,
      };
    },
    save: (state, { payload }) => {
      return {
        ...state,
        list: payload,
      };
    },
  },
});

export const getCheckpointDevices = (state) => state.checkpointDevice.list

export const {
  save: saveCheckpointDevices,
  add: addCheckpointDevice,
  update: updateCheckpointDevice,
  remove: removeCheckpointDevice,
} = actions;
export { reducer as checkpointDeviceReducer };
