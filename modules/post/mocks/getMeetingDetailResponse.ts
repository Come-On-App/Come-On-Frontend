import { GetMeetingDetailResponse } from '@post/api/v2/type';
import { meetingsSliceResponse } from './getMeetingsSliceResponse';
import { postMembers } from './members';
import { users } from './user';
import { dateVotingResponse } from './getDateVotingListResponse';

const [ONE, TWO, THREE, FOUR] = [1, 2, 3, 4] as const;

export const meetingDetailResponse = {
  [ONE]: {
    meetingMetaData: {
      hostUser: users[0],
      meetingId: meetingsSliceResponse[ONE].meetingId,
      thumbnailImageUrl: meetingsSliceResponse[ONE].meetingImageUrl,
      meetingName: meetingsSliceResponse[ONE].meetingName,
      meetingStartTime: meetingsSliceResponse[ONE].meetingStartTime,
      calendar: {
        startFrom: meetingsSliceResponse[ONE].calendarStartFrom,
        endTo: meetingsSliceResponse[ONE].calendarEndTo,
      },
      fixedDate: meetingsSliceResponse[ONE].fixedDate,
    },
    members: postMembers[ONE].contents,
    votingDates: dateVotingResponse[ONE].contents,
    places: [
      {
        meetingPlaceId: 3323,
        placeName: '홍대역',
        memo: '여기서 모이자',
        lat: 68.123,
        lng: 127.31561,
        address: 'XXX-YYYY',
        order: 1,
        category: 'ETC',
        googlePlaceId: 'asd23234tabn4tav',
      },
      {
        meetingPlaceId: 3642,
        placeName: '홍대 마약 떡볶이',
        memo: '점심식사',
        lat: 68.4567,
        lng: 127.1252346,
        address: 'ZZZ-1231',
        order: 2,
        category: 'RESTAURANT',
        googlePlaceId: '36m3w546hwh3w4gv',
      },
    ],
  },
  [TWO]: {
    meetingMetaData: {
      hostUser: users[1],
      meetingId: meetingsSliceResponse[TWO].meetingId,
      thumbnailImageUrl: meetingsSliceResponse[TWO].meetingImageUrl,
      meetingName: meetingsSliceResponse[TWO].meetingName,
      meetingStartTime: meetingsSliceResponse[TWO].meetingStartTime,
      calendar: {
        startFrom: meetingsSliceResponse[TWO].calendarStartFrom,
        endTo: meetingsSliceResponse[TWO].calendarEndTo,
      },
      fixedDate: meetingsSliceResponse[TWO].fixedDate,
    },
    members: postMembers[TWO].contents,
    votingDates: dateVotingResponse[TWO].contents,
    places: [
      {
        meetingPlaceId: 3323,
        placeName: '홍대역',
        memo: '여기서 모이자',
        lat: 68.123,
        lng: 127.31561,
        address: 'XXX-YYYY',
        order: 1,
        category: 'ETC',
        googlePlaceId: 'asd23234tabn4tav',
      },
      {
        meetingPlaceId: 3642,
        placeName: '홍대 마약 떡볶이',
        memo: '점심식사',
        lat: 68.4567,
        lng: 127.1252346,
        address: 'ZZZ-1231',
        order: 2,
        category: 'RESTAURANT',
        googlePlaceId: '36m3w546hwh3w4gv',
      },
    ],
  },
  [THREE]: {
    meetingMetaData: {
      meetingId: meetingsSliceResponse[THREE].meetingId,
      thumbnailImageUrl: meetingsSliceResponse[THREE].meetingImageUrl,
      meetingName: meetingsSliceResponse[THREE].meetingName,
      meetingStartTime: meetingsSliceResponse[THREE].meetingStartTime,
      hostUser: users[0],
      calendar: {
        startFrom: meetingsSliceResponse[THREE].calendarStartFrom,
        endTo: meetingsSliceResponse[THREE].calendarEndTo,
      },
      fixedDate: meetingsSliceResponse[THREE].fixedDate,
    },
    members: postMembers[THREE].contents,
    votingDates: dateVotingResponse[THREE].contents,
    places: [
      {
        meetingPlaceId: 3323,
        placeName: '홍대역',
        memo: '여기서 모이자',
        lat: 68.123,
        lng: 127.31561,
        address: 'XXX-YYYY',
        order: 1,
        category: 'ETC',
        googlePlaceId: 'asd23234tabn4tav',
      },
      {
        meetingPlaceId: 3642,
        placeName: '홍대 마약 떡볶이',
        memo: '점심식사',
        lat: 68.4567,
        lng: 127.1252346,
        address: 'ZZZ-1231',
        order: 2,
        category: 'RESTAURANT',
        googlePlaceId: '36m3w546hwh3w4gv',
      },
    ],
  },
  [FOUR]: {
    meetingMetaData: {
      meetingId: meetingsSliceResponse[FOUR].meetingId,
      thumbnailImageUrl: meetingsSliceResponse[FOUR].meetingImageUrl,
      meetingName: meetingsSliceResponse[FOUR].meetingName,
      meetingStartTime: meetingsSliceResponse[FOUR].meetingStartTime,
      hostUser: users[2],
      calendar: {
        startFrom: meetingsSliceResponse[FOUR].calendarStartFrom,
        endTo: meetingsSliceResponse[FOUR].calendarEndTo,
      },
      fixedDate: meetingsSliceResponse[FOUR].fixedDate,
    },
    members: postMembers[FOUR].contents,
    votingDates: dateVotingResponse[FOUR].contents,
    places: [
      {
        meetingPlaceId: 3323,
        placeName: '홍대역',
        memo: '여기서 모이자',
        lat: 68.123,
        lng: 127.31561,
        address: 'XXX-YYYY',
        order: 1,
        category: 'ETC',
        googlePlaceId: 'asd23234tabn4tav',
      },
      {
        meetingPlaceId: 3642,
        placeName: '홍대 마약 떡볶이',
        memo: '점심식사',
        lat: 68.4567,
        lng: 127.1252346,
        address: 'ZZZ-1231',
        order: 2,
        category: 'RESTAURANT',
        googlePlaceId: '36m3w546hwh3w4gv',
      },
    ],
  },
} as {
  [Key in string]: GetMeetingDetailResponse;
};
