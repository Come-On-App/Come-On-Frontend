// Query-client Key
export enum QueryKey {
  list = 'list',
  post = 'post',
  user = 'user',
  self = 'self',
  detail = 'detail',
  members = 'members',
  code = 'code',
  vote = 'vote',
  venue = 'venue',
}

export const QueryKeys = {
  venueList: (postId: number) => [
    QueryKey.detail,
    QueryKey.venue,
    QueryKey.list,
    postId,
  ],
  meetingCardList: (paramater: {
    dateFrom: string | undefined;
    dateTo: string | undefined;
  }) => [QueryKey.post, QueryKey.list, paramater],
  post: (postId: number) => [QueryKey.post, QueryKey.list, postId],
  postDetail: (postId: number) => [QueryKey.post, QueryKey.detail, postId],
  postVoteDetail: (postId: number) => [
    QueryKey.detail,
    QueryKey.vote,
    QueryKey.list,
    postId,
  ],
  postUserSelf: (postId: number) => [
    QueryKey.detail,
    QueryKey.user,
    QueryKey.self,
    postId,
  ],
  postVoteDate: (date: string) => [QueryKey.detail, QueryKey.vote, date],
  postMembers: (postId: number) => [QueryKey.detail, QueryKey.members, postId],
  postCode: (postId: number) => [QueryKey.post, QueryKey.code, postId],
};

export interface SliceResponse<T> {
  currentSlice: number;
  sizePerSlice: number;
  first: boolean;
  last: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  contentsCount: number;
  contents: T[];
}

export interface ListResponse<T> {
  contentsCount: number;
  contents: T[];
}

// 공통 오류 코드
type CommonErrorCode =
  | 1000
  | 1001
  | 1002
  | 1003
  | 1004
  | 1005
  | 1100
  | 1101
  | 1102
  | 1103;

// 모임 오류 코드
type MeetingErrorCode =
  | 3000
  | 3001
  | 3002
  | 3003
  | 3004
  | 3005
  | 3006
  | 3007
  | 3008
  | 3100
  | 3101
  | 3102
  | 3103
  | 3200
  | 3201
  | 3202
  | 3203
  | 3204
  | 3205;

// 유저 오류 코드
type UserErrorCode = 4000 | 4001 | 4002;

export type ErrorCode = CommonErrorCode | MeetingErrorCode | UserErrorCode;

export type MaybeErrorCode = ErrorCode | undefined;

export interface ErrorResponse {
  errorCode: ErrorCode;
  errorDescription: string;
  errors: null;
}
