import { useCallback } from 'react';
import { AccessTokenRes, AuthResponse, RefreshTokenRes } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout } from '../slices/authSlice';
import { deleteValueFor, save, getValueFor } from '../utils/secureStore';

const saveAccessToken = async (accessTokenData: AccessTokenRes) => {
  await save('accessToken', JSON.stringify(accessTokenData.accessToken)).catch(
    err => console.log(err),
  );
};
const saveRefreshToken = async (refreshTokennData: RefreshTokenRes) => {
  await save(
    'refreshToken',
    JSON.stringify(refreshTokennData.refreshToken),
  ).catch(err => console.log(err));
};
const getAccessToken = async () => {
  const data = await getTokenData('accessToken');

  if (data != null) {
    data as AccessTokenRes;

    return data.accessToken.token;
  }

  return null;
};

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
  const isValidToken = () => {
    getTokenData(StoreKey.accessToken).then(value => {
      if (value === null) {
        return false;
      }

      return true;
    });
  };
  const setLogoin = useCallback(async () => {
    const accessToken = await getTokenData(StoreKey.accessToken);
    const refreshToken = await getTokenData(StoreKey.refreshToken);

    console.log(accessToken);

    if (accessToken !== null && refreshToken !== null) {
      dispatch(login());
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
    await deleteValueFor(StoreKey.refreshToken).catch(err => {
      console.log(err);
    });
    dispatch(logout());
  }, [dispatch]);

  return {
    isAuth,
    setTokens,
    setLogout,
    setLogoin,
    isValidToken,
    getAccessToken,
  };
}

export default useAuth;
