import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: '',
  aporTypes: [],
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (_, { payload }) => ({
      username: payload.username,
      token: payload.token,
    }),
    saveAporTypes: (state, { payload }) => ({
      ...state,
      aporTypes: payload,
    }),
    remove: () => initialState,
  },
});

export const getUserToken = (state) => state.user.token;
export const getUsername = (state) => state.user.username;
export const getUserAporTypes = (state) => state.user.aporTypes;

export const { save: saveUser, remove: removeUser, saveAporTypes: saveUserAporTypes } = actions;
export { reducer as userReducer };
