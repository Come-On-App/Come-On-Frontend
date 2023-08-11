import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';
import {
  init,
  updateAppleLoadingStatus,
  updateErrorStatus,
  updateGoogleLoadingStatus,
  updateUserToken,
} from '@account/features/auth/authSlice';
import { UserToken } from '@account/features/auth/type';

/**
 * [redux] auth 상태, 디스패치를 반환한다.
 */
export default function useAuthManagement() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const dispatchAppleStatus = useCallback(
    (paylaod: boolean) => dispatch(updateAppleLoadingStatus(paylaod)),
    [dispatch],
  );
  const dispatchGoogleStatus = useCallback(
    (paylaod: boolean) => dispatch(updateGoogleLoadingStatus(paylaod)),
    [dispatch],
  );
  const dispatchErrorStatus = useCallback(
    (paylaod: boolean) => dispatch(updateErrorStatus(paylaod)),
    [dispatch],
  );
  const dispatchUserToken = useCallback(
    (paylaod: UserToken) => dispatch(updateUserToken(paylaod)),
    [dispatch],
  );
  const initPostState = useCallback(() => dispatch(init()), [dispatch]);

  return {
    authState,
    dispatchAppleStatus,
    dispatchGoogleStatus,
    dispatchUserToken,
    dispatchErrorStatus,
    initPostState,
  };
}
