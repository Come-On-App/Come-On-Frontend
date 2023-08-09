import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { SearchState } from './type';
import { DateRange } from '../post/type';

const initialState: SearchState = {
  dateRange: {
    startingDay: null,
    endingDay: null,
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    init: () => {
      return initialState;
    },
  },
});

export const { updateSearchRange, init } = searchSlice.actions;

export default searchSlice.reducer;
