import { useCallback } from 'react';
import { AccessTokenRes, AuthResponse, RefreshTokenRes } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout } from '../features/authSlice';
import { deleteValueFor, save, getValueFor } from '../utils/secureStore';

enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}

const saveAccessToken = async (accessTokenData: AccessTokenRes) => {
  await save('accessToken', JSON.stringify(accessTokenData.accessToken));
};
const saveRefreshToken = async (refreshTokennData: RefreshTokenRes) => {
  await save('refreshToken', JSON.stringify(refreshTokennData.refreshToken));
};
const getAccessToken = async () => {
  const data = await getTokenData('accessToken');

  if (data !== null) {
    data as AccessTokenRes;

    return data.accessToken.token;
  }

  return null;
};
const getTokenData = async (name: 'accessToken' | 'refreshToken') => {
  const tokenData = await getValueFor(name);

  if (tokenData) return JSON.parse(tokenData);

  return null;
};

function useAuth() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.haveToken);
  // 토큰이 있는지 없는지 검사하고, 없다면 로그아웃 시킴
  const isValidUser = useCallback(async () => {
    const accessToken = await getTokenData(StoreKey.accessToken);
    const refreshToken = await getTokenData(StoreKey.refreshToken);

    if (accessToken !== null && refreshToken !== null) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
  const setTokens = useCallback(
    async (data: AuthResponse) => {
      await saveAccessToken(data);
      await saveRefreshToken(data);

      dispatch(login());
    },
    [dispatch],
  );
  const setLogout = useCallback(async () => {
    await deleteValueFor(StoreKey.accessToken);
    await deleteValueFor(StoreKey.refreshToken);
    dispatch(logout());
  }, [dispatch]);

  return {
    isAuth,
    setTokens,
    setLogout,
    isValidUser,
    getAccessToken,
  };
}

export default useAuth;
