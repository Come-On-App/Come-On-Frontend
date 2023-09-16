import logger, { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import postSlice from '@post/features/post/postSlice';
import searchSlice from '@post/features/search/searchSlice';
import authSlice from '@account/features/auth/authSlice';
import userSlice from '@account/features/user/userSlice';
import detailSlice from '@post/features/detail/detailSlice';
import plannerSlice from '@post/features/detail/planner/plannerSlice';
import plannerEditSlice from '@post/features/detail/planner/plannerEditSlice';

// 커스텀 로거
const customLogger = createLogger({
  predicate: (getState, action) => {
    return action.type.startsWith('plannerEdit/');
  },
});

export default configureStore({
  reducer: {
    post: postSlice,
    search: searchSlice,
    auth: authSlice,
    user: userSlice,
    detail: detailSlice,
    planner: plannerSlice,
    plannerEdit: plannerEditSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
