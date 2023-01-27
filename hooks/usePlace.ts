import { useCallback, useMemo } from 'react';

import type { PlaceSelect } from '../types';
import { setPlace } from '../features/placeSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const usePlace = () => {
  const dispatch = useAppDispatch();
  const placeState = useAppSelector(state => state.placeReducer);
  const placeStateMemo = useMemo(() => placeState, [placeState]);
  const setPlaceSelectDispatch = useCallback(
    (payload: PlaceSelect) => {
      dispatch(setPlace(payload));
    },
    [dispatch],
  );

  return {
    placeState: placeStateMemo,
    setPlaceSelectDispatch,
  };
};

export default usePlace;
