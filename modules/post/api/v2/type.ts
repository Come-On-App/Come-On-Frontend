import { ListResponse, SliceResponse } from '@app/api/type';

export interface HostUser {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export type MemberRole = 'HOST' | 'PARTICIPANT';

export interface Calendar {
  startFrom: string;
  endTo: string;
}

export type FixedDate = Calendar | null;

// GET /api/v2/meetings (payalod)
export interface GetMeetingPayload {
  size: number;
  page: number;
  searchWords: string;
  dateFrom: string;
  dateTo: string;
}

export interface GetMeetingResponse {
  meetingId: number;
  hostUser: HostUser;
  memberCount: number;
  myMeetingRole: MemberRole;
  meetingName: string;
  calendarStartFrom: string;
  calendarEndTo: string;
  meetingStartTime: string;
  meetingImageUrl: string;
  fixedDate: FixedDate | undefined;
}

// GET /api/v2/meetings (response)
export type GetMeetingSliceResponse = SliceResponse<GetMeetingResponse>;

// GET /api/v2/meetings/{meeting-id} (payalod)
export type GetMeetingDetailPayload = number;

interface MeetingMetaData {
  meetingId: number;
  thumbnailImageUrl: string;
  meetingName: string;
  meetingStartTime: string;
  hostUser: HostUser;
  calendar: Calendar;
  fixedDate: FixedDate;
}

export interface Members {
  memberId?: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  memberRole: MemberRole;
}

interface VotingDates {
  date: string;
  memberCount: number;
  myVoting: boolean;
}

export type CategoryKey =
  | 'ACCOMMODATION'
  | 'ACTIVITY'
  | 'ATTRACTION'
  | 'BAR'
  | 'CAFE'
  | 'CULTURE'
  | 'ETC'
  | 'RESTAURANT'
  | 'SCHOOL'
  | 'SHOPPING'
  | 'SPORT';

export type CategoryLabel =
  | '학교'
  | '카페'
  | '술집'
  | '스포츠'
  | '쇼핑'
  | '관광명소'
  | '음식점'
  | '숙박'
  | '문화시설'
  | '액티비티'
  | '기타';

export interface Places {
  meetingPlaceId: number;
  placeName: string;
  memo: string | null;
  lat: number;
  lng: number;
  address: string;
  order: number;
  category: CategoryKey;
  googlePlaceId: string;
}

// GET /api/v2/meetings/{meeting-id} (response)
export interface GetMeetingDetailResponse {
  meetingMetaData: MeetingMetaData;
  members: Members[];
  votingDates: VotingDates[];
  places?: Places[] | null;
}

// GET /api/v2/meetings/{meeting-id}/members (payload)
export type GetMeetingMembersPayload = number;

interface GetMeetingMembersResponse {
  memberId: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  memberRole: MemberRole;
}

// GET /api/v2/meetings/{meeting-id}/members (response)
export type GetMeetingMembersListResponse =
  ListResponse<GetMeetingMembersResponse>;

// GET /api/v2/meetings/{meeting-id}/members/me (payload)
export type GetMeetingMemberMePayload = number;

// GET /api/v2/meetings/{meeting-id}/members/me (response)
export type GetMeetingMemberMeResponse = GetMeetingMembersResponse;
