import { configureStore } from '@reduxjs/toolkit';
import placeSlice from '../features/placeSlice';
import authReducer from '../features/authSlice';
import meetingReducer from '../features/meetingSlice';

export const store = configureStore({
  reducer: {
    placeReducer: placeSlice,
    auth: authReducer,
    meeting: meetingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
