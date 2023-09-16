import { createSlice } from '@reduxjs/toolkit';

import reducers, { initialState } from './reducers';

export const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers,
});

export const {
  updateTitle,
  updateContent,
  updateSubContent,
  updateCategory,
  addModuleField,
  deleteModuleField,
  updateField,
  updateFieldStatus,
  init,
  updatePlannerState,
} = plannerSlice.actions;

export default plannerSlice.reducer;
