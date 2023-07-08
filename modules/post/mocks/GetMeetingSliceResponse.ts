import { GetMeetingSliceResponse } from '@post/api/v2/type';

export default {
  currentSlice: 0,
  sizePerSlice: 3,
  first: true,
  last: true,
  hasPrevious: false,
  hasNext: false,
  contentsCount: 3,
  contents: [
    {
      meetingId: 1,
      hostUser: {
        userId: 1,
        nickname: '여행마스터',
        profileImageUrl: 'https://picsum.photos/200/300',
      },
      memberCount: 2,
      myMeetingRole: 'PARTICIPANT',
      meetingName: '물개들의 모임',
      calendarStartFrom: '2023-03-01',
      calendarEndTo: '2023-03-23',
      meetingStartTime: '08:00:00',
      meetingImageUrl: 'https://picsum.photos/500/500',
      fixedDate: {
        startFrom: '2023-07-10',
        endTo: '2023-07-11',
      },
    },
    {
      meetingId: 2,
      hostUser: {
        userId: 2,
        nickname: 'banana',
        profileImageUrl: 'https://picsum.photos/200/300',
      },
      memberCount: 4,
      myMeetingRole: 'HOST',
      meetingName: '물개들의 모임',
      calendarStartFrom: '2023-06-01',
      calendarEndTo: '2023-06-30',
      meetingStartTime: '13:30:00',
      meetingImageUrl: 'https://picsum.photos/500/500',
      fixedDate: {
        startFrom: '2023-06-10',
        endTo: '2023-06-10',
      },
    },
    {
      meetingId: 3,
      hostUser: {
        userId: 3,
        nickname: '사진광',
        profileImageUrl: 'https://picsum.photos/200/300',
      },
      memberCount: 5,
      myMeetingRole: 'HOST',
      meetingName: '풍경 사진 모임',
      calendarStartFrom: '2023-04-10',
      calendarEndTo: '2023-04-15',
      meetingStartTime: '13:00:00',
      meetingImageUrl: 'https://picsum.photos/500/500',
      fixedDate: null,
    },
    {
      meetingId: 4,
      hostUser: {
        userId: 4,
        nickname: '음악매니아',
        profileImageUrl: 'https://picsum.photos/200/300',
      },
      memberCount: 3,
      myMeetingRole: 'PARTICIPANT',
      meetingName: '음악 감상 모임',
      calendarStartFrom: '2023-05-05',
      calendarEndTo: '2023-05-05',
      meetingStartTime: '19:30:00',
      meetingImageUrl: 'https://picsum.photos/500/500',
      fixedDate: null,
    },
  ],
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
