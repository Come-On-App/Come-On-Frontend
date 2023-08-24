import { serverAPI } from '@app/api/axiosInstance';

import {
  DeleteUserResponse,
  PostAppleAuthPayload,
  PostAppleAuthResponse,
  PostGoogleAuthPayload,
  PostGoogleAuthResponse,
  PostUserLogoutResponse,
  PutMyInfoPayload,
  PutMyInfoResponse,
} from './type';

/**
 * POST /api/v1/oauth/google 구글 로그인
 * @param payload 구글 로그인 API 토큰
 * @returns 유효한 유저의 토큰
 */
export async function requestPostGoogleAuth(
  payload: PostGoogleAuthPayload,
): Promise<PostGoogleAuthResponse> {
  const URL = `/api/v1/oauth/google`;
  const { data } = await serverAPI.post(URL, payload);

  return data;
}

/**
 * POST /api/v1/oauth/apple 애플 로그인
 * @param payload 애플 로그인 API 토큰정보
 * @returns 유효한 유저의 토큰
 */
export async function requestPostAppleAuth(
  payload: PostAppleAuthPayload,
): Promise<PostAppleAuthResponse> {
  const URL = `/api/v1/oauth/apple`;
  const { data } = await serverAPI.post(URL, payload);

  return data;
}

/**
 * POST /api/v1/users/logout 유저 로그아웃
 * @requires Authorization Bearer {access-token}
 * @returns 요청 처리 성공 여부
 */
export async function requestPostUserLogout(): Promise<PostUserLogoutResponse> {
  const URL = `/api/v1/users/logout`;
  const { data } = await serverAPI.post(URL);

  return data;
}

/**
 * PUT /api/v1/users/me 내 정보 수정
 * @requires Authorization Bearer {access-token}
 * @param payload 변경할 닉네임, 프로필 이미지
 * @returns 요청 처리 성공 여부
 */
export async function requestPutMyInfo(
  payload: PutMyInfoPayload,
): Promise<PutMyInfoResponse> {
  const URL = `/api/v1/users/me`;
  const { data } = await serverAPI.put(URL, payload);

  return data;
}

/**
 * DELETE /api/v1/users/me 회원 탈퇴
 * @requires Authorization Bearer {access-token}
 * @returns 요청 처리 성공 여부
 */
export async function requestDeleteUser(): Promise<DeleteUserResponse> {
  const URL = `/api/v1/users/me`;
  const { data } = await serverAPI.delete(URL);

  return data;
}
