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

import type { ErrorResponse } from './api';

export type ErrorUserCode = 2500 | 2501 | 2600 | 2601 | 2602 | 4002;

export type ErrorMeetingResponse = ErrorResponse<ErrorUserCode>;

export type Role = 'ADMIN' | 'USER';

// GET /api/v1/users/me (response)
export interface GetMyInfoResponse {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
  role: Role;
  email?: string | null;
  name: string;
}

// PUT /api/v1/users/me (payload)
export interface PutMyInfoPayload {
  nickname: string;
  profileImageUrl?: string | null;
}

// PUT /api/v1/users/me (response)
export interface PutMyInfoResponse {
  success: boolean;
}

// POST /api/v1/auth/reissue (payload)
export interface PostReissuePayload {
  refreshToken: {
    token: string;
    expiry: number;
  };
}

// POST /api/v1/auth/reissue (response)
export interface PostReissueResponse extends ErrorMeetingResponse {
  accessToken: {
    token: string;
    expiry: number;
    userId: number;
  };
  refreshToken: {
    token: string;
    expiry: number;
  };
}
