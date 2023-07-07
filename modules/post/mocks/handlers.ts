import { BASE_URL } from '@app/api/axiosInstance';
import { GetMeetingResponse } from '@post/api/v2/type';
import { rest } from 'msw';
import response from './GetMeetingSliceResponse';

export default [
  rest.get<GetMeetingResponse>(
    `${BASE_URL}/api/v2/meetings`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(response));
    }
  ),
];
