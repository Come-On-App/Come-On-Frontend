import { useCallback } from 'react';
import { AccessTokenRes } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout, setToken } from '../features/authSlice';
import { deleteValueFor, getValueFor } from '../utils/secureStore';

enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}

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
      const data = { accessToken, refreshToken };

      // TODO추후 토큰 암호화해서 저장
      dispatch(setToken(data));
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
  const setLogout = useCallback(async () => {
    await deleteValueFor(StoreKey.accessToken);
    await deleteValueFor(StoreKey.refreshToken);
    dispatch(logout());
  }, [dispatch]);

  return {
    isAuth,
    setLogout,
    isValidUser,
    getAccessToken,
  };
}

export default useAuth;
