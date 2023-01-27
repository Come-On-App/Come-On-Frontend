import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, logout } from '../slices/authSlice';
import { deleteValueFor, save } from '../utils/secureStore';
import { AuthResponse } from '../types';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.haveToken);
  const setLogin = useCallback(
    async (data: AuthResponse | string) => {
      if (typeof data !== 'string') {
        await save('accessToken', JSON.stringify(data.accessToken)).catch(err =>
          console.log(err),
        );

        await save('refreshToken', JSON.stringify(data.refreshToken)).catch(
          err => {
            console.log(err);
          },
        );
      } else {
        // 구글 Token일 경우
        await save('accessToken', JSON.stringify(data)).catch(err =>
          console.log(err),
        );
      }

      dispatch(login());
    },
    [dispatch],
  );
  const setLogout = useCallback(async () => {
    await deleteValueFor('accessToken');
    await deleteValueFor('refreshToken').catch(err => {
      console.log(err);
    });
    dispatch(logout());
  }, [dispatch]);

  return {
    isAuth,
    setLogin,
    setLogout,
  };
};

export default useAuth;
