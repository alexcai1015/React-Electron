import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: '',
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (_, { payload }) => ({
      email: payload.email,
      token: payload.token,
    }),
    remove: () => initialState,
  },
});

export const { save: saveUser, remove: removeUser } = actions;
export { reducer as userReducer };
