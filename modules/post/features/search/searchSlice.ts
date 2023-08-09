import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { SearchState } from './type';
import { DateRange } from '../post/type';

export const initialSearchState: SearchState = {
  dateRange: {
    startingDay: null,
    endingDay: null,
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    updateDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    init: () => {
      return initialSearchState;
    },
  },
});

export const { updateDateRange, init } = searchSlice.actions;

export default searchSlice.reducer;
