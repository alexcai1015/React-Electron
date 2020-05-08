/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: '',
  xsrfToken: '',
  aporTypes: [],
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
      state.xsrfToken = payload.xsrfToken;
      state.aporTypes = payload.aporTypes ? payload.aporTypes : state.aporTypes;
    },
    saveAporTypes: (state, { payload }) => {
      state.aporTypes = payload;
    },
    remove: () => initialState,
  },
});

export const getUserToken = (state) => state.user.token;
export const getUsername = (state) => state.user.username;
export const getUserAporTypes = (state) => state.user.aporTypes;

export const { save: saveUser, remove: removeUser, saveAporTypes: saveUserAporTypes } = actions;
export { reducer as userReducer };
