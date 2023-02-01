/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getItemAsync } from 'expo-secure-store';
import { ActionSheetIOS } from 'react-native';

const initialState = {
  haveToken: false,
  accessToken: '',
  refreshToken: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
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
