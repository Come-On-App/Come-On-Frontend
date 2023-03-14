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
type ErrorCode =
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

type ErrorField = {
  field: string;
  message: string;
  rejectedValue: unknown;
};

export interface ErrorResponse<T> {
  errorCode: ErrorCode | T;
  errorDescription: string;
  errors: null | ErrorField;
}
