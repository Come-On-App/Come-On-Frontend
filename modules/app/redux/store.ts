import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import postSlice from '@post/features/post/postSlice';
import searchSlice from '@post/features/search/searchSlice';
import authSlice from '@account/features/auth/authSlice';

export default configureStore({
  reducer: {
    post: postSlice,
    search: searchSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
