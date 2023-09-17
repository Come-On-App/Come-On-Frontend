import { MemberRole } from '@post/api/v2/type';

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
