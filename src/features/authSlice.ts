import { deleteTokensfromDB, setTokensToDB } from '@api/token/token';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthResponse } from '@type/index';

const initialState = {
  haveToken: false,
  accessToken: {},
  refreshToken: {},
  userId: 0,
};

interface IAuth {
  haveToken: boolean;
  accessToken: { token: string; expiry: number; userId: number } | null;
  refreshToken: { token: string; expiry: number } | null;
  userId: number;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as IAuth,
  reducers: {
    setToken: (state, action: PayloadAction<AuthResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.accessToken.userId;
    },
    login: (state, action: PayloadAction<AuthResponse>) => {
      setTokensToDB(action.payload);

      state.haveToken = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.accessToken.userId;
    },
    logout: state => {
      deleteTokensfromDB();

      state.haveToken = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = 0;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
