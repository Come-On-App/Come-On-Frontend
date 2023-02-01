import { useCallback } from 'react';
import { getItemAsync } from 'expo-secure-store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout } from '../slices/authSlice';
import { deleteValueFor, save } from '../utils/secureStore';
import { AccessTknResponse, AuthResponse } from '../types';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.haveToken);
  // 토큰이 있는지 검사.
  const getToken = useCallback(async () => {
    const accessToken = await getItemAsync('accessToken');
    const refreshToken = await getItemAsync('refreshToken');

    if (accessToken !== null && refreshToken !== null) {
      dispatch(login());
    }
  }, [dispatch]);
  const setTokens = useCallback(
    async (data: AuthResponse) => {
      await save('accessToken', JSON.stringify(data.accessToken)).catch(err =>
        console.log(err),
      );

      await save('refreshToken', JSON.stringify(data.refreshToken)).catch(
        err => {
          console.log(err);
        },
      );

      dispatch(login());
    },
    [dispatch],
  );
  const setAccessToken = useCallback(async (data: AccessTknResponse) => {
    await save('accessToken', JSON.stringify(data.accessToken)).catch(err =>
      console.log(err),
    );
  }, []);
  const setLogout = useCallback(async () => {
    await deleteValueFor('accessToken');
    await deleteValueFor('refreshToken').catch(err => {
      console.log(err);
    });
    dispatch(logout());
  }, [dispatch]);

  return {
    isAuth,
    setTokens,
    setLogout,
    getToken,
    setAccessToken,
  };
};

export default useAuth;
