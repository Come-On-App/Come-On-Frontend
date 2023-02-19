/**
 * 타입 명시 규칙
 *
 * ***
 * POST /api/v1/meetings (payload or response) <- 주석 명시
 * {서버 메소드} + 이름 + {payload or response}
 * ***
 *
 * e.g POST /api/v1/meetings
 *
 * interface PostMeetingPayload <- 요청 형식
 *
 * interface PostMeetingResponse <- 응답 형식
 */

import type { ErrorResponse, ListResponse, SliceResponse } from './api';

export type ErrorMeetingCode =
  | 3000
  | 3001
  | 3002
  | 3003
  | 3004
  | 3005
  | 3100
  | 3200
  | 3201
  | 3202
  | 3203
  | 3204;

export type ErrorMeetingResponse = ErrorResponse<ErrorMeetingCode>;

export type Category =
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

export type MemberRole = 'HOST' | 'PARTICIPANT';

interface HostUser {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
}

interface FixedDate {
  startFrom: string;
  endTo: string;
}

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
  fixedDate?: FixedDate | null;
}

interface Members {
  memberId: number;
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
  memberRole: MemberRole;
}

interface VotingDates {
  date: string;
  memberCount: number;
  myVoting: boolean;
}

interface Places {
  meetingPlaceId: number;
  placeName: string;
  memo?: string | null;
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  order: number;
  category: Category;
  googlePlaceId?: string | null;
}

// POST /api/v1/meetings (payalod)
export interface PostMeetingPayload {
  meetingName: string;
  meetingImageUrl: string;
  calendarStartFrom: string;
  calendarEndTo: string;
}

// POST /api/v1/meetings (response)
export interface PostMeetingResponse {
  meetingId: number;
}

// GET /api/v1/meetings (payalod)
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
  fixedDate?: FixedDate | null;
}

// GET /api/v1/meetings (response)
export type GetMeetingSliceResponse = SliceResponse<GetMeetingResponse>;

// GET /api/v1/meetings/{meeting-id} (payalod)
export type GetMeetingDetailPayload = number;

// GET /api/v1/meetings/{meeting-id} (response)
export interface GetMeetingDetailResponse {
  meetingMetaData: MeetingMetaData;
  members: Members[];
  votingDates: VotingDates[];
  places?: Places | null;
}

// POST /api/v1/meetings/join (payalod)
export interface PostJoinPayload {
  entryCode: string;
}

// POST /api/v1/meetings/join (response)
export interface PostJoinResponse {
  meetingId: number;
  meetingMember: {
    memberId: number;
    memberRole: MemberRole;
  };
}

// GET /api/v1/meetings/{meeting-id}/entry-code (payalod)
export type GetEntryCodePayload = number;

// GET /api/v1/meetings/{meeting-id}/entry-code (response)
export interface GetEntryCodeResponse {
  meetingId: number;
  entryCode: string;
  expiredAt: string;
}

// POST /api/v1/meetings/{meeting-id}/entry-code (payalod)
export type PostEntryCodePayalod = number;

// POST /api/v1/meetings/{meeting-id}/entry-code (response)
export interface PostEntryCodeResponse {
  meetingId: number;
  entryCode: string;
  expiredAt: string;
}

// POST /api/v1/meetings/{meeting-id}/meeting-time (payalod)
export interface PostMeetingTimePayalod {
  meetingId: number;
  meetingStartTime: string;
}

// POST /api/v1/meetings/{meeting-id}/meeting-time (response)
export interface PostMeetingTimeResponse {
  success: boolean;
}

// GET /api/v1/meetings/{meeting-id}/members (payalod)
export type GetMeetingMembersPayload = number;

interface GetMeetingMembersResponse {
  memberId: number;
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
  memberRole: MemberRole;
}

// GET /api/v1/meetings/{meeting-id}/members (response)
export type GetMeetingMembersListResponse =
  ListResponse<GetMeetingMembersResponse>;

// GET /api/v1/meetings/{meeting-id}/places (paylaod)
export type GetMeetingPlacesPayalod = number;

// GET /api/v1/meetings/{meeting-id}/places (response)
export type GetMeetingPlacesListResponse = ListResponse<Places>;

type MeetingPlaces = {
  name: string;
  memo?: string | null;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  category: Category;
  googlePlaceId?: string | null;
};

// POST /api/v1/meetings/{meeting-id}/places (payload)
export interface PostAddMeetingPlacesPayload {
  meetingId: number;
  payalod: MeetingPlaces;
}

// POST /api/v1/meetings/{meeting-id}/places (response)
export interface PostAddMeetingPlacesResponse {
  meetingPlaceId: number;
}

// PUT /api/v1/meetings/{meeting-id}/places/{place-id} (payload)
export interface PutUpdateMeetingPlacesPayload {
  meetingId: number;
  placeId: number;
  payload: MeetingPlaces;
}

// PUT /api/v1/meetings/{meeting-id}/places/{place-id} (response)
export interface PutUpdateMeetingPlacesResponse {
  success: boolean;
}

// DELETE /api/v1/meetings/{meeting-id}/places/{place-id} (payalod)
export interface DeleteMeetingPlacePayload {
  meetingId: number;
  placeId: number;
}

// DELETE /api/v1/meetings/{meeting-id}/places/{place-id} (response)
export interface DeleteMeetingPlaceResponse {
  success: boolean;
}

// POST /api/v1/meetings/{meeting-id}/date/voting (payload)
export interface PostDateVotingPayload {
  meetingId: number;
  payload: {
    date: string;
  };
}

// POST /api/v1/meetings/{meeting-id}/date/voting (response)
export interface PostDateVotingResponse {
  success: boolean;
}

// DELETE /api/v1/meetings/{meeting-id}/date/voting 모임일 투표 삭제 (payload)
export interface DeleteDateVotingPayload {
  meetingId: number;
  payload: {
    date: string;
  };
}

// DELETE /api/v1/meetings/{meeting-id}/date/voting 모임일 투표 삭제 (response)
export interface DeleteDateVotingResponse {
  success: boolean;
}

// GET /api/v1/meetings/{meeting-id}/date/voting (payload)
export type GetDateVotingPayload = number;

interface GetDateVotingResponse {
  date: string;
  memberCount: number;
  myVoting: boolean;
}

// GET /api/v1/meetings/{meeting-id}/date/voting (response)
export type GetDateVotingListResponse = ListResponse<GetDateVotingResponse>;

// GET /api/v1/meetings/{meeting-id}/date/voting/details (payload)
export interface GetDateVotingDetailsPayload {
  meetingId: number;
  payload: {
    date: string;
  };
}

// GET /api/v1/meetings/{meeting-id}/date/voting/details (response)
export interface GetDateVotingDetailsResponse {
  date: string;
  memberCount: number;
  myVoting: boolean;
  votingUsers: {
    userId: number;
    nickname: string;
    profileImageUrl?: string | null;
    memberRole: MemberRole;
  };
}

// POST /api/v1/meetings/{meeting-id}/date/confirm (payload)
export interface PostConfirmMeetingDatePayload {
  meetingId: number;
  payload: {
    meetingDateStartFrom: string;
    meetingDateEndTo: string;
  };
}

// POST /api/v1/meetings/{meeting-id}/date/confirm (response)
export interface PostConfirmMeetingDateResponse {
  success: boolean;
}

// GET /api/v1/meetings/{meeting-id}/date/confirm (payload)
export type GetConfirmMeetingDatePayload = number;

// GET /api/v1/meetings/{meeting-id}/date/confirm (response)
export interface GetConfirmMeetingDateResponse {
  meetingId: number;
  fixedDate?: FixedDate | null;
}
