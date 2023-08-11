import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AuthState, UserToken } from './type';

const initialState: AuthState = {
  userToken: null,
  isLoading: {
    apple: false,
    google: false,
  },
  isReissue: false,
  isError: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAppleLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading.apple = action.payload;
    },
    updateGoogleLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading.google = action.payload;
    },
    updateReissueStatus: (state, action: PayloadAction<boolean>) => {
      state.isReissue = action.payload;
    },
    updateErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    updateUserToken: (state, action: PayloadAction<UserToken>) => {
      state.userToken = action.payload;
    },
    init: () => {
      return initialState;
    },
  },
});

export const {
  updateAppleLoadingStatus,
  updateGoogleLoadingStatus,
  updateReissueStatus,
  updateUserToken,
  updateErrorStatus,
  init,
} = authSlice.actions;

export default authSlice.reducer;
