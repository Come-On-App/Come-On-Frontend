type MessageType =
  | 'RESOURCE_UPDATED_EVENT'
  | 'UNSUBSCRIBE_MEETING_EVENT'
  | 'SUBSCRIBE_MEETING_EVENT'
  | 'MEETING_SUBSCRIBE_USER_LIST'
  | 'LOCKED_MEETING_PLACE_LIST'
  | 'LOCKED_MEETING_PLACE_LIST'
  | 'DROPPED';

type MeetingResourceType =
  | 'MEETING_METADATA'
  | 'MEETING_MEMBERS'
  | 'MEETING_PLACES'
  | 'MEETING_VOTING'
  | 'MEETING_FIXED_DATE'
  | 'MEETING_PLACE_LOCK'
  | 'MEETING_PLACE_UNLOCK'
  | 'LOCKED_MEETING_PLACE_LIST'
  | 'MEETING_TIME';

type Data = {
  meetingId: number;
  targetDate: string;
  targetUserId: number;
  userId: number;
  userIds: number[];
  meetingPlaceId: number;
  meetingResourceType: MeetingResourceType;
  lockedPlaces: {
    meetingPlaceId: number;
    lockingUserId: number;
  }[];
};

interface IMessageBody {
  messageType: MessageType;
}

// 모임 시작 시간 갱신 메시지
// 모임 회원 리스트 갱신 메시지
// 모임 장소 리스트 갱신 메시지
// 모임 확정일 정보 갱신 메시지
export interface IMeeting extends IMessageBody {
  data: Pick<Data, 'meetingId' | 'meetingResourceType'>;
}

// 모임일 투표 현황 갱신 메시지
export interface IMeetingVoting extends IMessageBody {
  data: Pick<Data, 'meetingId' | 'targetDate' | 'meetingResourceType'>;
}

// 모임 구독 이벤트 메시지
// 모임 구독 해제 이벤트 메시지
export interface ISubscribe extends IMessageBody {
  data: Pick<Data, 'meetingId' | 'targetUserId'>;
}

// 모임 페이지 구독중인 유저 리스트 메시지
export interface ISubscribeList extends IMessageBody {
  data: Pick<Data, 'meetingId' | 'userIds'>;
}

// 강퇴당한 유저가 받을 정보
export interface IDroppedMeeting extends IMessageBody {
  data: Pick<Data, 'meetingId' | 'userId'>;
}

// 모임 장소 락 등록 메시지
// 모임 장소 락 해제 메시지
export interface IMeetingPlaceLock extends IMessageBody {
  data: Pick<
    Data,
    'meetingId' | 'userId' | 'meetingResourceType' | 'meetingPlaceId'
  >;
}

// 모임 구독시, 개인 메시지 구독 경로
export interface IMeetingIndividual extends IMessageBody {
  data: Pick<Data, 'meetingId' | 'lockedPlaces'>;
}
