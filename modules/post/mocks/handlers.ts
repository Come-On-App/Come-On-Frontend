import { BASE_URL } from '@app/api/axiosInstance';
import { GetMeetingResponse } from '@post/api/v2/type';
import { rest } from 'msw';
import response from './GetMeetingSliceResponse';
import { GetEntryCodeResponse } from '@post/api/v1/type';

export const requstGetMeetings = rest.get<GetMeetingResponse>(
  `${BASE_URL}/api/v2/meetings`,
  (_req, res, ctx) => {
    return res(ctx.json(response));
  }
);

export const requestGetEntryCode = rest.get<GetEntryCodeResponse>(
  `${BASE_URL}/api/v1/meetings/:meetingId/entry-code`,
  (req, res, ctx) => {
    const { meetingId } = req.params;

    // 서버에러 코드
    if (meetingId === '500') {
      return res(
        ctx.status(500),
        ctx.json({
          errorCode: 1000,
          errorDescription: '서버 내부 오류입니다. 오류 문의 부탁드립니다.',
          errors: null,
        })
      );
    }

    // 코드만료
    if (meetingId === '600') {
      return res(
        ctx.json({
          meetingId: meetingId,
          entryCode: 'AP3DTD',
          expiredAt: '2020-08-30 23:11:30',
        })
      );
    }

    return res(
      ctx.json({
        meetingId: meetingId,
        entryCode: 'DJE52P',
        expiredAt: '2035-08-30 23:11:30',
      })
    );
  }
);

export const requestPostEntryCode = rest.post(
  `${BASE_URL}/api/v1/meetings/:meetingId/entry-code`,
  (_req, res, ctx) => {
    return res(
      ctx.json({
        meetingId: 'AP11LE',
        entryCode: 'DJE52P',
        expiredAt: '2035-08-30 23:11:30',
      })
    );
  }
);

export const requestCreateMeetings = rest.post(
  `${BASE_URL}/api/v1/meetings`,
  (_req, res, ctx) => {
    return res(
      ctx.delay(3000),
      ctx.json({
        meetingId: 28,
      })
    );
  }
);

export const requestUploadImage = rest.post(
  `${BASE_URL}/api/v1/image`,
  (_req, res, ctx) => {
    return res(
      ctx.json({
        imageUrl: 'https://picsum.photos/200/300',
      })
    );
  }
);

export const requestDeleteMeeting = rest.delete(
  `${BASE_URL}/api/v1/meetings/:meetingId/members/me`,

  (_req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
      })
    );
  }
);

export default [
  requstGetMeetings,
  requestGetEntryCode,
  requestPostEntryCode,
  requestCreateMeetings,
  requestUploadImage,
  requestDeleteMeeting,
];
