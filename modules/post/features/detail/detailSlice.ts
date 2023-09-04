import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { FixedDate } from '@post/api/v2/type';
import type { DetailState, VotingStatus } from './type';

export const initialDetailState: DetailState = {
  postId: 0,
  votingStatus: { contentsCount: 0, contents: [] },
  fixedDate: null,
};

export const detailSlice = createSlice({
  name: 'detail',
  initialState: initialDetailState,
  reducers: {
    updateCurrentPostId: (state, action: PayloadAction<number>) => {
      state.postId = action.payload;
    },
    updateVotingStatus: (state, action: PayloadAction<VotingStatus>) => {
      state.votingStatus = action.payload;
    },
    updateFixedDate: (state, action: PayloadAction<FixedDate>) => {
      state.fixedDate = action.payload;
    },
    init: () => {
      return initialDetailState;
    },
  },
});

export const {
  updateCurrentPostId,
  updateVotingStatus,
  updateFixedDate,
  init,
} = detailSlice.actions;

export default detailSlice.reducer;
