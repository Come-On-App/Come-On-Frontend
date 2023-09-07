import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { CategoryType } from '@post/components/detail/planner/venue/card/category/type';
import type { PlannerState } from './type';

export const initialPlannerState: PlannerState = {
  title: '',
  content: '',
  subContent: '',
  category: '기타',
};

export const plannerSlice = createSlice({
  name: 'planner',
  initialState: initialPlannerState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    updateSubContent: (state, action: PayloadAction<string>) => {
      state.subContent = action.payload;
    },
    updateCategory: (state, action: PayloadAction<CategoryType>) => {
      state.category = action.payload;
    },
    init: () => {
      return initialPlannerState;
    },
  },
});

export const {
  updateTitle,
  updateContent,
  updateSubContent,
  updateCategory,
  init,
} = plannerSlice.actions;

export default plannerSlice.reducer;
