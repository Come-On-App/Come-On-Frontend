import { rest } from 'msw';

import { BASE_URL } from '@app/api/config';

const requestMeetingJoin = rest.post(
  `${BASE_URL}/api/v1/meetings/join`,
  async (req, res, ctx) => {
    const payload = await req.json<{ entryCode: string }>();

    // 이미 해당 모임에 가입된 경우
    if (payload.entryCode === '300000') {
      return res(
        ctx.status(409),
        ctx.json({
          errorCode: 3000,
          errorDescription: '이미 해당 모임에 가입하셨습니다.',
          errors: null,
        })
      );
    }

    // 입력한 입장 코드와 일치하는 모임이 없는 경우
    if (payload.entryCode === '300100') {
      return res(
        ctx.status(404),
        ctx.json({
          errorCode: 3001,
          errorDescription: '입력한 입장코드와 일치하는 모임이 없습니다.',
          errors: null,
        })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.json({
        meetingId: 1,
        meetingMember: {
          memberId: 2,
          memberRole: 'PARTICIPANT',
        },
      })
    );
  }
);

export default [requestMeetingJoin];
