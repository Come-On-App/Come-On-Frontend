import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import postSlice from '@post/features/post/postSlice';
import searchSlice from '@post/features/search/searchSlice';

export default configureStore({
  reducer: {
    post: postSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
