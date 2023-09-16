import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';
import {
  updateCurrentPostId,
  init,
  updateCurrentCardId,
  updatePostStatus,
} from '@post/features/detail/detailSlice';
import { PostStatus } from '@post/features/detail/type';

/**
 * [redux] post detail 상태, 디스패치를 반환한다.
 */
export default function useDetailManagement() {
  const dispatch = useAppDispatch();
  const detailState = useAppSelector((state) => state.detail, shallowEqual);
  const dispatchCurrentPostId = useCallback(
    (payload: number) => {
      dispatch(updateCurrentPostId(payload));
    },
    [dispatch],
  );
  const dispatchCurrentCardId = useCallback(
    (payload: number) => {
      dispatch(updateCurrentCardId(payload));
    },
    [dispatch],
  );
  const dispatchPostStatus = useCallback(
    (payload: PostStatus) => {
      dispatch(updatePostStatus(payload));
    },
    [dispatch],
  );
  const initDetailState = useCallback(() => {
    dispatch(init());
  }, [dispatch]);

  return {
    detailState,
    initDetailState,
    dispatchCurrentPostId,
    dispatchCurrentCardId,
    dispatchPostStatus,
  };
}
