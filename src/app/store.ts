import { configureStore } from '@reduxjs/toolkit';

import placeSlice from '@features/placeSlice';
import placeLockSlice from '@features/placeLockSlice';
import authSlice from '@features/authSlice';
import meetingSlice from '@features/meetingSlice';
import socketReducer from '../features/socketSlice';

export const store = configureStore({
  reducer: {
    place: placeSlice,
    placeLock: placeLockSlice,
    auth: authSlice,
    meeting: meetingSlice,
    socket: socketReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
