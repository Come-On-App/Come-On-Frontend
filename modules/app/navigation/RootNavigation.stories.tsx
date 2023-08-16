import { rest } from 'msw';
import { ComponentMeta } from '@storybook/react-native';

import { RootNavigator } from './RootNavigation';
import { BASE_URL } from '@app/api/config';
import {
  mockExpiredUserAuthToken,
  mockUserAuthToken,
} from '@account/mocks/mockAuth';
import getMeetingsSliceResponse from '@post/mocks/getMeetingsSliceResponse';

type Meta = ComponentMeta<typeof RootNavigator>;

export default {
  title: 'Screens',
  component: RootNavigator,
} as Meta;

export const Root: Meta = {};

export const RefreshTokenExpiry: Meta = {
  parameters: {
    msw: {
      handlers: [
        rest.post(`${BASE_URL}/api/v1/oauth/apple`, (_req, res, ctx) => {
          return res(ctx.json(mockExpiredUserAuthToken));
        }),
        rest.post(`${BASE_URL}/api/v1/auth/reissue`, (_req, res, ctx) => {
          return res(
            ctx.delay(1000),
            ctx.status(403),
            ctx.json({
              errorCode: 4002,
              errorDescription:
                '리프레시 토큰이 유효하지 않습니다. 다시 로그인 해주세요.',
              errors: null,
            })
          );
        }),
        rest.get(`${BASE_URL}/api/v2/meetings`, (_req, res, ctx) => {
          return res(
            ctx.status(403),
            ctx.json({
              errorCode: 4001,
              errorDescription:
                '엑세스 토큰이 유효하지 않습니다. 엑세스 토큰 재발급을 시도해주세요.',
              errors: null,
            })
          );
        }),
      ],
    },
  },
};

export const AccesssTokenExpiry: Meta = {
  parameters: {
    msw: {
      handlers: [
        rest.post(`${BASE_URL}/api/v1/oauth/apple`, (_req, res, ctx) => {
          return res(ctx.json(mockExpiredUserAuthToken));
        }),
        rest.post(`${BASE_URL}/api/v1/auth/reissue`, (_req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json(mockUserAuthToken));
        }),
        rest.get(`${BASE_URL}/api/v2/meetings`, async (req, res, ctx) => {
          const authorization = req.headers.get('authorization');

          if (authorization?.match('newAccessToken')) {
            return res(ctx.delay(1000), ctx.json(getMeetingsSliceResponse));
          }

          return res(
            ctx.status(403),
            ctx.json({
              errorCode: 4001,
              errorDescription:
                '엑세스 토큰이 유효하지 않습니다. 엑세스 토큰 재발급을 시도해주세요.',
              errors: null,
            })
          );
        }),
      ],
    },
  },
};
