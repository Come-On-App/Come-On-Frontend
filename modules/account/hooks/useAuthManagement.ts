import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';
import {
  init,
  updateAppleLoadingStatus,
  updateErrorReason,
  updateErrorStatus,
  updateGoogleLoadingStatus,
  updateUserLoginStatus,
} from '@account/features/auth/authSlice';

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
  const dispatchUserLoginStatus = useCallback(
    (paylaod: boolean) => dispatch(updateUserLoginStatus(paylaod)),
    [dispatch],
  );
  const dispatchErrorReason = useCallback(
    (paylaod: string | null) => dispatch(updateErrorReason(paylaod)),
    [dispatch],
  );
  const initAuthState = useCallback(
    (shouldRemoveTokenFromStore = false) =>
      dispatch(init(shouldRemoveTokenFromStore)),
    [dispatch],
  );

  return {
    authState,
    dispatchAppleStatus,
    dispatchGoogleStatus,
    dispatchUserLoginStatus,
    dispatchErrorStatus,
    dispatchErrorReason,
    initAuthState,
  };
}
