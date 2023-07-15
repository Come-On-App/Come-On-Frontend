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
