import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import meetingReducer from './slices/meetingSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    meeting: meetingReducer,
  },
});
