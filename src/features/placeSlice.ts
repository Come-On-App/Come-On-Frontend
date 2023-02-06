import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PlaceSelect } from '../types';

const initialState: PlaceSelect = {
  address: '',
  region: null,
  currentLocation: null,
  marker: null,
  name: '마커를 지정해주세요',
  placeId: '',
  category: '미지정',
  description: '',
};

export const placeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setPlace: (_state, action: PayloadAction<PlaceSelect>) => {
      return action.payload;
    },
  },
});

export const { setPlace } = placeSlice.actions;

export default placeSlice.reducer;
