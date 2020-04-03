import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: '',
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (_, { payload }) => ({
      username: payload.username,
      token: payload.token,
    }),
    remove: () => initialState,
  },
});

export const getUserToken = (state) => state.user.token;

export const { save: saveUser, remove: removeUser } = actions;
export { reducer as userReducer };
