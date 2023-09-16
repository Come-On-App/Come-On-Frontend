import { PlannerReducers, PlannerState } from './type';

export const initialState: PlannerState = {
  title: '',
  content: '',
  subContent: '',
  category: 'ETC',
  customModuleFields: [],
  hasFieldError: false,
};

const reducers: PlannerReducers = {
  updatePlannerState: (_state, action) => {
    return action.payload;
  },
  updateTitle: (state, action) => {
    state.title = action.payload;
  },
  updateContent: (state, action) => {
    state.content = action.payload;
  },
  updateSubContent: (state, action) => {
    state.subContent = action.payload;
  },
  updateCategory: (state, action) => {
    state.category = action.payload;
  },
  updateFieldStatus: (state, action) => {
    state.hasFieldError = action.payload;
  },
  addModuleField: (state, action) => {
    state.customModuleFields.unshift(action.payload);
  },
  deleteModuleField: (state, action) => {
    state.customModuleFields = state.customModuleFields.filter(
      (field) => field.itemKey !== action.payload,
    );
  },
  updateField: (state, action) => {
    state.customModuleFields = state.customModuleFields.map((field) => {
      if (field.itemKey === action.payload.itemKey) {
        return {
          ...field,
          ...action.payload,
        };
      }

      return field;
    });
  },
  init: () => {
    return initialState;
  },
};

export default reducers;
