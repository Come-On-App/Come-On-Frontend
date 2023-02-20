/**
 * 타입 명시 규칙
 *
 * ***
 * POST /api/v1/meetings (payload or response) <- 주석 명시
 * {서버 메소드} + 이름 + {payload or response}
 * ***
 *
 * e.g POST /api/v1/meetings
 *
 * interface PostMeetingPayload <- 요청 형식
 *
 * interface PostMeetingResponse <- 응답 형식
 */

import type { Error } from './api';

export type ErrorImageCode = 9000;

export type ErrorMeetingResponse = Error<ErrorImageCode>;

interface FormDataBody {
  name: string;
  type: string;
  uri: string;
}

export type FormDataValue = FormDataBody | Blob;

// POST /api/v1/image (payload)
export type PostUploadImagePayload = FormData;

// POST /api/v1/image (response)
export interface PostUploadImageResponse {
  imageUrl: string;
}
