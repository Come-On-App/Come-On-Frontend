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
