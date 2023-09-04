import { ListResponse } from '@app/api/type';
import { MemberRole } from '../v2/type';

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

// POST /api/v1/image (payload)
export type PostUploadImagePayload = FormData;

// POST /api/v1/image (response)
export interface PostUploadImageResponse {
  imageUrl: string;
}

// DELETE /api/v1/meetings/{meeting-id}/members/me (payload)
export type DeleteMeetingPayload = number;

// DELETE /api/v1/meetings/{meeting-id}/members/me (response)
export interface DeleteMeetingResponse {
  success: boolean;
}

// PATCH /api/v1/meetings/{meetingId} (payalod)
// 같이 사용하니까 Post 타입 사용
export interface PatchMeetingPayload {
  meetingId: number;
  payload: Partial<PostMeetingPayload>;
}

// PATCH /api/v1/meetings/{meeting-id} (response)
export interface PatchMeetingResponse {
  success: boolean;
}

// POST /api/v1/report/meeting (payload)
export interface PostReportMeetingPayload {
  meetingId: number;
  title: string;
  content: string;
  reportImageUrl?: string;
}

// POST /api/v1/report/meeting (payload)
export interface PostReportMeetingResponse {
  reportId: number;
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

export interface GetDateVotingResponse {
  date: string;
  memberCount: number;
  myVoting: boolean;
}

// GET /api/v1/meetings/{meeting-id}/date/voting (payload)
export type GetDateVotingPayload = number;

// GET /api/v1/meetings/{meeting-id}/date/voting (response)
export type GetDateVotingListResponse = ListResponse<GetDateVotingResponse>;

// GET /api/v1/meetings/{meeting-id}/meeting-time (payalod)
export type GetMeetingTimePayalod = number;

// GET /api/v1/meetings/{meeting-id}/meeting-time (response)
export interface GetMeetingTimeResponse {
  meetingStartTime: string;
}

// GET /api/v1/meetings/{meeting-id}/date/voting/details (payload)
export interface GetDateVotingDetailsPayload {
  meetingId: number;
  date: string;
}

interface VotingUsers {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
  memberRole: MemberRole;
}

// GET /api/v1/meetings/{meeting-id}/date/voting/details (response)
export interface GetDateVotingDetailsResponse {
  date: string;
  memberCount: number;
  myVoting: boolean;
  votingUsers: VotingUsers[];
}

// POST /api/v1/meetings/{meeting-id}/date/voting (payload)
export interface PostDateVotingPayload {
  meetingId: number;
  date: string;
}

// POST /api/v1/meetings/{meeting-id}/date/voting (response)
export interface PostDateVotingResponse {
  success: boolean;
}

export interface DeleteDateVotingPayload {
  meetingId: number;
  date: string;
}

// DELETE /api/v1/meetings/{meeting-id}/date/voting (response)
export interface DeleteDateVotingResponse {
  success: boolean;
}

// POST /api/v1/meetings/{meeting-id}/date/confirm (payload)
export interface PostConfirmMeetingDatePayload {
  meetingId: number;
  meetingDate: {
    meetingDateStartFrom: string;
    meetingDateEndTo: string;
  };
}

// POST /api/v1/meetings/{meeting-id}/date/confirm (response)
export interface PostConfirmMeetingDateResponse {
  success: boolean;
}

// DELETE /api/v1/meetings/{meeting-id}/date/confirm (payload)
export type DeleteConfirmMeetingDatePayload = number;

// DELETE /api/v1/meetings/{meeting-id}/date/confirm (response)
export interface DeleteConfirmMeetingDateResponse {
  success: boolean;
}
