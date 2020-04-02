import { createSlice } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { arrayToDictionary } from '../../common/utils/arrays';
import { ApprovalStatus } from '../../common/constants';

const initialState = {
  current: {},
  byId: {},
  allIds: {},
};

const { actions, reducer } = createSlice({
  name: 'accessPass',
  initialState,
  reducers: {
    setCurrent: (state, { payload }) => {
      const id = payload;
      const current = R.pick([id], state.byId);
      return {
        ...state,
        current,
      };
    },
    removeById: (state, { payload }) => {
      const id = payload;
      const byId = R.omit([id], state.byId);
      const allIds = R.omit([id], state.allIds);
      return {
        ...state,
        byId,
        allIds,
      };
    },
    denyById: (state, { payload }) => {
      const id = payload;
      const accessPass = R.prop([id], state.byId);

      const byId = { ...state.byId, [id]: { ...accessPass, status: ApprovalStatus.Declined } };
      return {
        ...state,
        byId,
      };
    },
    approveById: (state, { payload }) => {
      const id = payload;
      const accessPass = R.prop([id], state.byId);

      const byId = { ...state.byId, [id]: { ...accessPass, status: ApprovalStatus.Approved } };
      return {
        ...state,
        byId,
      };
    },
    save: (state, { payload }) => {
      const byId = arrayToDictionary((value) => value.id)(payload);
      const allIds = payload.map((value) => value.id);

      return {
        ...state,
        byId,
        allIds,
      };
    },
    clear: () => initialState,
  },
});

export const getAccessPassesSelector = (state) => state.accessPass.byId;

export const {
  save: saveAccessPasses,
  setCurrent: setCurrentAccessPass,
  clear: clearAccessPass,
  removeById: removeAccessPassById,
  denyById: denyAccessPassById,
  approveById: approveAccessPassById,
} = actions;
export { reducer as accessPassReducer };
