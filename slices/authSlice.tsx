/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  haveToken: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.haveToken = true;
    },
    logout: state => {
      state.haveToken = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
