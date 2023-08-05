import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Image, DateRange, Name, PostState } from './type';

const initialState: PostState = {
  image: {
    uri: null,
    asset: null,
  },
  name: null,
  dateRange: {
    startingDay: null,
    endingDay: null,
  },
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updateImage: (state, action: PayloadAction<Image>) => {
      state.image = action.payload;
    },
    updateName: (state, action: PayloadAction<Name>) => {
      state.name = action.payload;
    },
    updateDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    update: (state, action: PayloadAction<Partial<PostState>>) => {
      return Object.assign(state, action.payload);
    },
    init: () => {
      return initialState;
    },
  },
});

export const { updateImage, updateName, updateDateRange, update, init } =
  postSlice.actions;

export default postSlice.reducer;
