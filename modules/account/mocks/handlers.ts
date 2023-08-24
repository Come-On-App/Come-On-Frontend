import { rest } from 'msw';

import { mockUserAuthToken } from './mockAuth';
import { BASE_URL } from '@app/api/config';
import { mockMyInfo } from './mockUser';

const requestPostGoogleAuth = rest.post(
  `${BASE_URL}/api/v1/oauth/google`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(mockUserAuthToken));
  }
);

const requestPostAppleAuth = rest.post(
  `${BASE_URL}/api/v1/oauth/apple`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(mockUserAuthToken));
  }
);

const requestPostReissueToken = rest.post(
  `${BASE_URL}/api/v1/auth/reissue`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(mockUserAuthToken));
  }
);

const requestGetMyInfo = rest.get(
  `${BASE_URL}/api/v2/users/me`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(mockMyInfo));
  }
);

const requestPostUserLogout = rest.post(
  `${BASE_URL}/api/v1/users/logout`,
  (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json({
        success: true,
      })
    );
  }
);

const requestPutMyInfo = rest.put(
  `${BASE_URL}/api/v1/users/me`,
  (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json({
        success: true,
      })
    );
  }
);

const requestDeleteUser = rest.delete(
  `${BASE_URL}/api/v1/users/me`,
  (_req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json({
        success: true,
      })
    );
  }
);

export default [
  requestDeleteUser,
  requestPutMyInfo,
  requestPostUserLogout,
  requestGetMyInfo,
  requestPostGoogleAuth,
  requestPostAppleAuth,
  requestPostReissueToken,
];
