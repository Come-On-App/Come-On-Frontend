import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout, setToken } from '../features/authSlice';
import { deleteValueFor, getValueFor } from '../utils/secureStore';

enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}

const getTokenData = async (name: 'accessToken' | 'refreshToken') => {
  const tokenData = await getValueFor(name);

  if (tokenData) return JSON.parse(tokenData);

  return null;
};

function useAuth() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.haveToken);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const refreshToken = useAppSelector(state => state.auth.refreshToken);
  const myId = useAppSelector(state => state.auth.userId);
  const isValidUser = useCallback(async () => {
    const accessTkn = await getTokenData(StoreKey.accessToken);
    const refreshTkn = await getTokenData(StoreKey.refreshToken);

    if (accessTkn !== null && refreshTkn !== null) {
      const data = { accessToken: accessTkn, refreshToken: refreshTkn };

      // TODO추후 토큰 암호화해서 저장
      dispatch(setToken(data));
      dispatch(login());
    } else {
      // 토큰이 유효하지 않으면 로그아웃 시켜야함 .
      dispatch(logout());
    }
  }, [dispatch]);
  const getAccessToken = useCallback(() => {
    return accessToken;
  }, [accessToken]);
  const getRefreshToken = useCallback(() => {
    return refreshToken;
  }, [refreshToken]);
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
    getRefreshToken,
    myId,
  };
}

export default useAuth;
