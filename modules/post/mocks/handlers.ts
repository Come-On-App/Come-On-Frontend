import { rest } from 'msw';

import meetingsSliceResponse, {
  EmptyResponse,
} from './getMeetingsSliceResponse';
import { GetMeetingResponse } from '@post/api/v2/type';
import { GetEntryCodeResponse } from '@post/api/v1/type';
import { BASE_URL } from '@app/api/config';
import { postMembers } from './members';
import { meetingDetailResponse } from './getMeetingDetailResponse';
import image from './image';
import { dateVotingResponse } from './getDateVotingListResponse';
import { meetingMemberMeResponse } from './getMeetingMemberMeResponse';
import { meetingTimeResponse } from './getMeetingTimeResponse';
import { getDateVotingDetailsResponse } from './getDateVotingDetailsResponse';
import { meetingPlaceListResponse } from './getMeetingPlaceListResponse';

const requstGetMeetings = rest.get<GetMeetingResponse>(
  `${BASE_URL}/api/v2/meetings`,
  (req, res, ctx) => {
    if (req.url.searchParams.get('dateFrom'))
      return res(ctx.delay(2000), ctx.json(EmptyResponse));

    return res(ctx.json(meetingsSliceResponse));
  }
);

const requestGetEntryCode = rest.get<GetEntryCodeResponse>(
  `${BASE_URL}/api/v1/meetings/:meetingId/entry-code`,
  (req, res, ctx) => {
    const { meetingId } = req.params;

    // 서버에러 상태
    if (meetingId === '1') {
      return res(
        ctx.status(500),
        ctx.json({
          errorCode: 1000,
          errorDescription: '서버 내부 오류입니다. 오류 문의 부탁드립니다.',
          errors: null,
        })
      );
    }

    // 코드만료 상태
    if (meetingId === '2') {
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

const requestPostEntryCode = rest.post(
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

const requestCreateMeetings = rest.post(
  `${BASE_URL}/api/v1/meetings`,
  (_req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json({
        meetingId: 5,
      })
    );
  }
);

const requestUploadImage = rest.post(
  `${BASE_URL}/api/v1/image`,
  (_req, res, ctx) => {
    return res(
      ctx.json({
        imageUrl: image(),
      })
    );
  }
);

const requestDeleteMeeting = rest.delete(
  `${BASE_URL}/api/v1/meetings/:meetingId/members/me`,
  (_req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
      })
    );
  }
);

const requestGetMeetingDetail = rest.get(
  `${BASE_URL}/api/v2/meetings/:meetingId`,
  (req, res, ctx) => {
    const { meetingId } = req.params as any;

    return res(ctx.delay(1000), ctx.json(meetingDetailResponse[meetingId]));
  }
);

const requestPatchMeetings = rest.patch(
  `${BASE_URL}/api/v1/meetings/:meetingId`,
  (_req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json({ success: true }));
  }
);

const requestPostReportMeeting = rest.post(
  `${BASE_URL}/api/v1/report/meeting`,
  (_req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json({ reportId: 33 }));
  }
);

const requestGetMeetingMembers = rest.get(
  `${BASE_URL}/api/v2/meetings/:meetingId/members`,
  (req, res, ctx) => {
    const { meetingId } = req.params as any;

    return res(ctx.delay(1000), ctx.json(postMembers[meetingId]));
  }
);

const requestPostMeetingTime = rest.post(
  `${BASE_URL}/api/v1/meetings/:meetingId/meeting-time`,
  (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json({
        success: true,
      })
    );
  }
);

const requestGetDateVoting = rest.get(
  `${BASE_URL}/api/v1/meetings/:meetingId/date/voting`,
  (req, res, ctx) => {
    const { meetingId } = req.params as any;

    return res(ctx.delay(1000), ctx.json(dateVotingResponse[meetingId]));
  }
);

const requestGetMeetingMemberMe = rest.get(
  `${BASE_URL}/api/v2/meetings/:meetingId/members/me`,
  (req, res, ctx) => {
    const { meetingId } = req.params as any;

    return res(ctx.delay(1000), ctx.json(meetingMemberMeResponse[meetingId]));
  }
);

const requestGetMeetingTime = rest.get(
  `${BASE_URL}/api/v1/meetings/:meetingId/meeting-time`,
  (req, res, ctx) => {
    const { meetingId } = req.params as any;

    return res(ctx.delay(1000), ctx.json(meetingTimeResponse[meetingId]));
  }
);

const requestGetDateVotingDetails = rest.get(
  `${BASE_URL}/api/v1/meetings/:meetingId/date/voting/details`,
  (req, res, ctx) => {
    const { meetingId } = req.params as any;
    const date = req.url.searchParams.get('date');

    if (!date) {
      return res(ctx.status(403));
    }
    return res(ctx.json(getDateVotingDetailsResponse[meetingId][date]));
  }
);

const requestAddDateVoting = rest.post(
  `${BASE_URL}/api/v1/meetings/:meetingId/date/voting`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ success: true }));
  }
);

const requestDeleteDateVoting = rest.delete(
  `${BASE_URL}/api/v1/meetings/:meetingId/date/voting`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ success: true }));
  }
);

const requestPostConfirmMeetingDate = rest.post(
  `${BASE_URL}/api/v1/meetings/:meetingId/date/confirm`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ success: true }));
  }
);

const requestDeleteConfirmMeetingDate = rest.delete(
  `${BASE_URL}/api/v1/meetings/:meetingId/date/confirm`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ success: true }));
  }
);

const requestAddMeetingPlace = rest.post(
  `${BASE_URL}/api/v1/meetings/:meetingId/places`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ meetingPlaceId: 1 }));
  }
);

const requestMeetingPlace = rest.get(
  `${BASE_URL}/api/v1/meetings/:meetingId/places`,
  (req, res, ctx) => {
    const { meetingId } = req.params as any;

    return res(ctx.delay(1000), ctx.json(meetingPlaceListResponse[meetingId]));
  }
);

const requestUpdateMeetingPlace = rest.put(
  `${BASE_URL}/api/v1/meetings/:meetingId/places/:placeId`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ success: true }));
  }
);

const requestDeleteMeetingPlace = rest.delete(
  `${BASE_URL}/api/v1/meetings/:meetingId/places/:placeId`,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ success: true }));
  }
);

export default [
  requestDeleteMeetingPlace,
  requestUpdateMeetingPlace,
  requestAddMeetingPlace,
  requestMeetingPlace,
  requestPostConfirmMeetingDate,
  requestDeleteConfirmMeetingDate,
  requestAddDateVoting,
  requestDeleteDateVoting,
  requestGetDateVotingDetails,
  requestGetMeetingTime,
  requestGetMeetingMemberMe,
  requestGetDateVoting,
  requestPostMeetingTime,
  requestGetMeetingMembers,
  requstGetMeetings,
  requestGetEntryCode,
  requestPostEntryCode,
  requestCreateMeetings,
  requestUploadImage,
  requestDeleteMeeting,
  requestGetMeetingDetail,
  requestPatchMeetings,
  requestPostReportMeeting,
];
