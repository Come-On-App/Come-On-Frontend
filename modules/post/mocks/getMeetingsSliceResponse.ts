import { GetMeetingSliceResponse } from '@post/api/v2/type';
import mockImage from './image';
import { users } from './user';
import { meetingMemberMeResponse } from './getMeetingMemberMeResponse';
import { meetingTimeResponse } from './getMeetingTimeResponse';

const [ONE, TWO, THREE, FOUR] = [1, 2, 3, 4] as const;

export const meetingsSliceResponse = {
  [ONE]: {
    meetingId: ONE,
    hostUser: users[0],
    memberCount: 2,
    myMeetingRole: meetingMemberMeResponse[ONE].memberRole,
    meetingName: '상태:방장 (초대코드 관리 에러상태)',
    calendarStartFrom: '2023-07-08',
    calendarEndTo: '2023-07-15',
    meetingStartTime: meetingTimeResponse[ONE].meetingStartTime,
    meetingImageUrl: mockImage(),
    fixedDate: {
      startFrom: '2023-07-10',
      endTo: '2023-07-10',
    },
  },
  [TWO]: {
    meetingId: TWO,
    hostUser: users[1],
    memberCount: 4,
    myMeetingRole: meetingMemberMeResponse[TWO].memberRole,
    meetingName: '상태:참여자 (초대코드 관리 만료상태)',
    calendarStartFrom: '2023-06-02',
    calendarEndTo: '2023-06-03',
    meetingStartTime: meetingTimeResponse[TWO].meetingStartTime,
    meetingImageUrl: mockImage(),
    fixedDate: null,
  },
  [THREE]: {
    meetingId: 3,
    hostUser: users[0],
    memberCount: 5,
    myMeetingRole: meetingMemberMeResponse[THREE].memberRole,
    meetingName: '상태:방장',
    calendarStartFrom: '2023-04-10',
    calendarEndTo: '2023-04-10',
    meetingStartTime: meetingTimeResponse[THREE].meetingStartTime,
    meetingImageUrl: mockImage(),
    fixedDate: null,
  },
  [FOUR]: {
    meetingId: 4,
    hostUser: users[2],
    memberCount: 3,
    myMeetingRole: meetingMemberMeResponse[FOUR].memberRole,
    meetingName: '상태:참여자',
    calendarStartFrom: '2023-03-05',
    calendarEndTo: '2023-03-08',
    meetingStartTime: meetingTimeResponse[FOUR].meetingStartTime,
    meetingImageUrl: mockImage(),
    fixedDate: {
      startFrom: '2023-03-08',
      endTo: '2023-03-08',
    },
  },
};

export default {
  currentSlice: 0,
  sizePerSlice: 4,
  first: true,
  last: true,
  hasPrevious: false,
  hasNext: false,
  contentsCount: 4,
  contents: Object.values(meetingsSliceResponse),
} as GetMeetingSliceResponse;

export const EmptyResponse: GetMeetingSliceResponse = {
  currentSlice: 0,
  sizePerSlice: 3,
  first: true,
  last: true,
  hasPrevious: false,
  hasNext: false,
  contentsCount: 0,
  contents: [],
};
