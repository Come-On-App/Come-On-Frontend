// Query-client Key
export enum QueryKeys {
  meetings = 'meetings',
  code = 'code',
  post = 'post',
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
