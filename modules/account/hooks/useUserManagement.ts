import { useCallback } from 'react';

import { updateLoadingStatus } from '@account/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';

/**
 * [redux] user 상태, 디스패치를 반환한다.
 */
export default function useUserManagement() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const dispatchLoadingStatus = useCallback(
    (paylaod: boolean) => dispatch(updateLoadingStatus(paylaod)),
    [dispatch],
  );

  return { dispatchLoadingStatus, userState };
}
