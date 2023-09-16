import { MetaData } from '@post/components/detail/planner/customField/type';
import { PayloadAction, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { CategoryKey } from '@post/api/v2/type';

export type CustomModuleFields = MetaData[];

export interface PlannerState {
  title: string;
  content: string;
  subContent: string;
  category: CategoryKey;
  customModuleFields: CustomModuleFields;
  hasFieldError: boolean;
}

// 리듀서 타입 정의
export type PlannerReducers = ValidateSliceCaseReducers<
  PlannerState,
  {
    updatePlannerState: (
      state: PlannerState,
      action: PayloadAction<PlannerState>,
    ) => PlannerState | void;
    updateTitle: (state: PlannerState, action: PayloadAction<string>) => void;
    updateContent: (state: PlannerState, action: PayloadAction<string>) => void;
    updateSubContent: (
      state: PlannerState,
      action: PayloadAction<string>,
    ) => void;
    updateCategory: (
      state: PlannerState,
      action: PayloadAction<CategoryKey>,
    ) => void;
    updateFieldStatus: (
      state: PlannerState,
      action: PayloadAction<boolean>,
    ) => void;
    addModuleField: (
      state: PlannerState,
      action: PayloadAction<MetaData>,
    ) => void;
    deleteModuleField: (
      state: PlannerState,
      action: PayloadAction<string>,
    ) => void;
    updateField: (
      state: PlannerState,
      action: PayloadAction<Partial<MetaData>>,
    ) => void;
    init: () => PlannerState;
  }
>;
