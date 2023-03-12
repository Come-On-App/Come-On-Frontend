import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlaceSelect } from '@type/index';

const initialState: PlaceSelect = {
  address: '',
  currentLocation: null,
  marker: null,
  mapRegion: null,
  placeName: '마커를 지정해주세요',
  googlePlaceId: '',
  category: null,
  description: '',
  meetingId: 0,
  meetingPlaceId: 0,
  meetingPlaceCardMarker: null,
  state: 'Add',
  isChanged: false,
  isLock: false,
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setPlace: (_state, action: PayloadAction<PlaceSelect>) => {
      return action.payload;
    },
    setReset: () => {
      return initialState;
    },
  },
});

export const { setPlace, setReset } = placeSlice.actions;

export default placeSlice.reducer;
