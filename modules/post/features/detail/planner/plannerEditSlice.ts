import { createSlice } from '@reduxjs/toolkit';

import reducers, { initialState } from './reducers';

export const plannerEditSlice = createSlice({
  name: 'plannerEdit',
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
} = plannerEditSlice.actions;

export default plannerEditSlice.reducer;
