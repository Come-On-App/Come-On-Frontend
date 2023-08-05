import { SliceResponse } from '@app/api/type';

interface HostUser {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export type MemberRole = 'HOST' | 'PARTICIPANT';

interface FixedDate {
  startFrom: string;
  endTo: string;
}

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
  fixedDate: FixedDate | null | undefined;
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
  calendar: {
    startFrom: string;
    endTo: string;
  };
  fixedDate: FixedDate | null;
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

type CategoryKey =
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
