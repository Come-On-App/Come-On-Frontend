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
  isError: false,
  error: {
    reason: null,
  },
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
    updateErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    updateUserLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    updateErrorReason: (state, action: PayloadAction<string | null>) => {
      state.error.reason = action.payload;
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
  updateUserLoginStatus,
  updateErrorStatus,
  updateErrorReason,
  init,
} = authSlice.actions;

export default authSlice.reducer;
