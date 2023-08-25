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
