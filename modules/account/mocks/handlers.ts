import { rest } from 'msw';

import { mockUserAuthToken } from './mockAuth';
import { BASE_URL } from '@app/api/config';

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

export default [
  requestPostGoogleAuth,
  requestPostAppleAuth,
  requestPostReissueToken,
];
