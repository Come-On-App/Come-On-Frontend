import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';
import {
  updateTitle,
  updateContent,
  updateSubContent,
  updateCategory,
  init,
  addModuleField,
  deleteModuleField,
  updateField,
  updatePlannerState,
  updateFieldStatus,
} from '@post/features/detail/planner/plannerSlice';
import { MetaData } from '@post/components/detail/planner/customField/type';
import { CategoryKey } from '@post/api/v2/type';
import { PlannerState } from '@post/features/detail/planner/type';

/**
 * [redux] post planner 상태, 디스패치를 반환한다.
 */
export default function usePlannerManagement() {
  const dispatch = useAppDispatch();
  const plannerState = useAppSelector(
    (state) => state.planner,
    (prev, next) => {
      // 배열의 동일성을 검사하는 로직
      return JSON.stringify(prev) === JSON.stringify(next);
    },
  );
  const dispatchState = useCallback(
    (payload: PlannerState) => {
      dispatch(updatePlannerState(payload));
    },
    [dispatch],
  );
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
    (payload: CategoryKey) => {
      dispatch(updateCategory(payload));
    },
    [dispatch],
  );
  const dispatchFieldStatus = useCallback(
    (payload: boolean) => {
      dispatch(updateFieldStatus(payload));
    },
    [dispatch],
  );
  const dispatchAddField = useCallback(
    (payload: MetaData) => {
      dispatch(addModuleField(payload));
    },
    [dispatch],
  );
  const dispatchDeleteField = useCallback(
    (payload: string) => {
      dispatch(deleteModuleField(payload));
    },
    [dispatch],
  );
  const dispatchUpdateField = useCallback(
    (payload: Partial<MetaData>) => {
      dispatch(updateField(payload));
    },
    [dispatch],
  );
  const initPlannerState = useCallback(() => {
    dispatch(init());
  }, [dispatch]);

  return {
    plannerState,
    dispatchState,
    dispatchTitle,
    dispatchContent,
    dispatchSubContent,
    dispatchCategory,
    dispatchFieldStatus,
    initPlannerState,
    dispatchDeleteField,
    dispatchUpdateField,
    dispatchAddField,
  };
}
