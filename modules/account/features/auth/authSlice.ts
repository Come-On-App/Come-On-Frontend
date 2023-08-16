import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { asyncWave } from 'async-wave';
import { deleteUserTokenFromStore } from '@shared/utils/secureStore';
import { AuthState } from './type';

const initialState: AuthState = {
  isLogin: false,
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
    updateUserLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    init: {
      reducer: () => {
        return initialState;
      },
      prepare: (shouldRemoveTokenFromStore?: boolean) => {
        if (shouldRemoveTokenFromStore) {
          asyncWave([deleteUserTokenFromStore]);
        }

        return { payload: undefined };
      },
    },
  },
});

export const {
  updateAppleLoadingStatus,
  updateGoogleLoadingStatus,
  updateReissueStatus,
  updateUserLoginStatus,
  updateErrorStatus,
  init,
} = authSlice.actions;

export default authSlice.reducer;
