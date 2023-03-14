import { useCallback, useMemo } from 'react';

import type { PlaceSelect } from '@type/index';
import { setPlace, setReset } from '@features/placeSlice';
import { useAppDispatch, useAppSelector } from './hooks';

const usePlace = () => {
  const dispatch = useAppDispatch();
  const placeState = useAppSelector(state => state.place);
  const memoPlaceState = useMemo(() => placeState, [placeState]);
  const placeDispatch = useCallback(
    (payload: PlaceSelect) => {
      dispatch(setPlace(payload));
    },
    [dispatch],
  );
  const placeResetDispatch = useCallback(() => {
    dispatch(setReset());
  }, [dispatch]);
  /**
   * useEffect 내부에서 사용금지 -> 무한 리-렌더링 발생
   */
  const placeEachDispatch = useCallback(
    <K extends keyof PlaceSelect, T extends PlaceSelect[K]>(
      key: K,
      payload: T,
    ) => {
      dispatch(
        setPlace({
          ...memoPlaceState,
          [key]: payload,
        }),
      );
    },
    [dispatch, memoPlaceState],
  );

  return {
    placeState: memoPlaceState,
    placeResetDispatch,
    placeDispatch,
    placeEachDispatch,
  };
};

export default usePlace;
