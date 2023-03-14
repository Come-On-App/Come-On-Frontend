export type MessageType =
  | 'RESOURCE_UPDATED_EVENT'
  | 'MEETING_SUBSCRIBE_USER_LIST'
  | 'SUBSCRIBE_MEETING_EVENT'
  | 'UNSUBSCRIBE_MEETING_EVENT';

export interface MeetingMembersResponse {
  meetingId: number;
  meetingResourceType: 'MEETING_MEMBERS';
}

export interface MeetingFixedDateResponse {
  meetingId: number;
  meetingResourceType: 'MEETING_FIXED_DATE';
}

export interface MeetingVotingResponse {
  meetingId: number;
  targetDate: string;
  meetingResourceType: 'MEETING_VOTING';
}

export interface GetSocketResponse {
  messageType: MessageType;
  data:
    | MeetingMembersResponse
    | MeetingFixedDateResponse
    | MeetingVotingResponse;
}
