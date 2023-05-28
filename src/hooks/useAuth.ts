import { AuthResponse } from '@type/index';
import { useCallback } from 'react';
import { isExpiry } from '@utils/fn';
import { deleteTokensfromDB, setTokensToDB } from '@api/token/token';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { login, logout } from '../features/authSlice';
import { getValueFor } from '../utils/secureStore';

enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}

export const tokenDataIsValid = async () => {
  const accessTkn = await getTokenData(StoreKey.accessToken);
  const refreshTkn = await getTokenData(StoreKey.refreshToken);

  if (accessTkn !== null && refreshTkn !== null) {
    const data = { accessToken: accessTkn, refreshToken: refreshTkn };

    return data;
  }

  return false;
};

const getTokenData = async (name: 'accessToken' | 'refreshToken') => {
  const tokenData = await getValueFor(name);

  if (tokenData) return JSON.parse(tokenData);

  return null;
};

function useAuth() {
  const dispatch = useAppDispatch();
  const authSelector = useAppSelector(state => state.auth);
  const {
    haveToken: isAuth,
    accessToken,
    refreshToken,
    userId: myId,
  } = authSelector;
  const getRefreshToken = useCallback(() => {
    return refreshToken;
  }, [refreshToken]);
  const setLogout = useCallback(() => {
    deleteTokensfromDB();
    dispatch(logout());
  }, [dispatch]);
  const setLogin = useCallback(
    (token: AuthResponse) => {
      setTokensToDB(token);
      dispatch(login(token));
    },
    [dispatch],
  );
  const autoLogin = useCallback(async () => {
    const myToken = await tokenDataIsValid();

    if (myToken) {
      const expiryTime = myToken.accessToken.expiry;
      const isTokenExpiry = isExpiry(expiryTime);

      if (isTokenExpiry) return;

      setLogin(myToken);
    }
  }, [setLogin]);

  return {
    isAuth,
    setLogout,
    accessToken,
    authSelector,
    getRefreshToken,
    autoLogin,
    setLogin,
    myId,
  };
}

export default useAuth;
