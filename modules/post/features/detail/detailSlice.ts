import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { DetailState, PostStatus } from './type';

export const initialDetailState: DetailState = {
  postId: 0,
  cardId: 0,
  status: 'CREATE',
};

export const detailSlice = createSlice({
  name: 'detail',
  initialState: initialDetailState,
  reducers: {
    updateCurrentPostId: (state, action: PayloadAction<number>) => {
      state.postId = action.payload;
    },
    updateCurrentCardId: (state, action: PayloadAction<number>) => {
      state.cardId = action.payload;
    },
    updatePostStatus: (state, action: PayloadAction<PostStatus>) => {
      state.status = action.payload;
    },
    init: () => {
      return initialDetailState;
    },
  },
});

export const {
  updateCurrentPostId,
  updateCurrentCardId,
  updatePostStatus,
  init,
} = detailSlice.actions;

export default detailSlice.reducer;
