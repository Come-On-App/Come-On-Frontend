import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import postSlice from '@post/features/post/postSlice';

export default configureStore({
  reducer: {
    post: postSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
