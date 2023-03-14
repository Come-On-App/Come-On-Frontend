import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PlaceLock {
  meetingResourceType: 'MEETING_PLACE_LOCK' | 'MEETING_PLACE_UNLOCK';
  meetingId: number;
  meetingPlaceId: number;
  userId: number;
  lockUserImage: string | null;
}
const initialState: PlaceLock = {
  meetingResourceType: 'MEETING_PLACE_UNLOCK',
  meetingId: 0,
  meetingPlaceId: 0,
  userId: 0,
  lockUserImage: null,
};

export const placeLockSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setLock: (state, action: PayloadAction<PlaceLock>) => {
      return action.payload;
    },
    setUnLock: () => {
      return initialState;
    },
  },
});

export const { setLock, setUnLock } = placeLockSlice.actions;

export default placeLockSlice.reducer;
