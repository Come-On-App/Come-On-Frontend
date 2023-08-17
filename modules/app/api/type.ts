// Query-client Key
export enum QueryKeys {
  meetings = 'meetings',
  code = 'code',
  post = 'post',
  user = 'user',
}

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
