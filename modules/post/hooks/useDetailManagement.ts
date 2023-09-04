import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';
import {
  updateCurrentPostId,
  updateVotingStatus,
  updateFixedDate,
} from '@post/features/detail/detailSlice';
import { VotingStatus } from '@post/features/detail/type';
import { FixedDate } from '@post/api/v2/type';

/**
 * [redux] post detail 상태, 디스패치를 반환한다.
 */
export default function useDetailManagement() {
  const dispatch = useAppDispatch();
  const detailState = useAppSelector((state) => state.detail);
  const dispatchCurrentPostId = useCallback(
    (payload: number) => {
      dispatch(updateCurrentPostId(payload));
    },
    [dispatch],
  );
  const dispatchVotingStatus = useCallback(
    (payload: VotingStatus) => {
      dispatch(updateVotingStatus(payload));
    },
    [dispatch],
  );
  const dispatchFixedDate = useCallback(
    (payload: FixedDate) => {
      dispatch(updateFixedDate(payload));
    },
    [dispatch],
  );

  return {
    detailState,
    dispatchVotingStatus,
    dispatchCurrentPostId,
    dispatchFixedDate,
  };
}
