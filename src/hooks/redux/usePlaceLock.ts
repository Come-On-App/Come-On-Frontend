import { useCallback } from 'react';

import { PlaceLock, setLock, setUnLock } from '@features/placeLockSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export type PlaceLockDispatch = (payload: PlaceLock) => void;

export type PlaceUnLockDispatch = () => void;

const usePlaceLock = () => {
  const dispatch = useAppDispatch();
  const placeLockState = useAppSelector(state => state.placeLock);
  const meetingResourceType = useAppSelector(
    state => state.placeLock.meetingResourceType,
  );
  const placeLockDispatch = useCallback(
    (payload: PlaceLock) => {
      dispatch(setLock(payload));
    },
    [dispatch],
  );
  const placeUnLockDispatch = useCallback(() => {
    dispatch(setUnLock());
  }, [dispatch]);

  return {
    placeLockState,
    placeLockDispatch,
    placeUnLockDispatch,
    meetingResourceType,
  };
};

export default usePlaceLock;
