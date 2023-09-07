import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';
import {
  updateTitle,
  updateContent,
  updateSubContent,
  updateCategory,
  init,
} from '@post/features/detail/plannerSlice';
import { CategoryType } from '@post/components/detail/planner/venue/card/category/type';

/**
 * [redux] post planner 상태, 디스패치를 반환한다.
 */
export default function usePlannerManagement() {
  const dispatch = useAppDispatch();
  const plannerState = useAppSelector((state) => state.planner);
  const dispatchTitle = useCallback(
    (payload: string) => {
      dispatch(updateTitle(payload));
    },
    [dispatch],
  );
  const dispatchContent = useCallback(
    (payload: string) => {
      dispatch(updateContent(payload));
    },
    [dispatch],
  );
  const dispatchSubContent = useCallback(
    (payload: string) => {
      dispatch(updateSubContent(payload));
    },
    [dispatch],
  );
  const dispatchCategory = useCallback(
    (payload: CategoryType) => {
      dispatch(updateCategory(payload));
    },
    [dispatch],
  );
  const initPlannerState = useCallback(() => {
    dispatch(init());
  }, [dispatch]);

  return {
    plannerState,
    dispatchTitle,
    dispatchContent,
    dispatchSubContent,
    dispatchCategory,
    initPlannerState,
  };
}
