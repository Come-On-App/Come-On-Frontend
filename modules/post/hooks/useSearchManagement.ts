import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';

import { DateInfo } from '@shared/components/calendar/type';
import { updateDateRange, init } from '@post/features/search/searchSlice';

/**
 * [redux] search 상태, 디스패치를 반환한다.
 */
export default function useSearchManagement() {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);
  const dispatchSearchRange = useCallback(
    (startingDay: DateInfo, endingDay: DateInfo) => {
      const newPayload = {
        startingDay,
        endingDay,
      };

      dispatch(updateDateRange(newPayload));
    },
    [dispatch],
  );
  const initSearchState = useCallback(() => dispatch(init()), [dispatch]);

  return {
    searchState,
    initSearchState,
    dispatchSearchRange,
  };
}
