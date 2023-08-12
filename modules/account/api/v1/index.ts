/* eslint-disable import/prefer-default-export */
import { serverAPI } from '@app/api/axiosInstance';
import {
  PostAppleAuthPayload,
  PostAppleAuthResponse,
  PostGoogleAuthPayload,
  PostGoogleAuthResponse,
} from './type';

/**
 * @see https://api.come-on.me/docs/users/index.html#google-login
 * POST /api/v1/oauth/google 구글 로그인
 * @param payload 구글 로그인 API 토큰
 * @returns 로그인 처리된 유저의 토큰
 */
export async function requestPostGoogleAuth(
  payload: PostGoogleAuthPayload,
): Promise<PostGoogleAuthResponse> {
  const URL = `/api/v1/oauth/google`;
  const { data } = await serverAPI.post(URL, payload);

  return data;
}

/**
 * @see https://api.come-on.me/docs/users/index.html#apple-login
 * POST /api/v1/oauth/apple 애플 로그인
 * @param payload 애플 로그인 API 토큰정보
 * @returns 로그인 처리된 유저의 토큰
 */
export async function requestPostAppleAuth(
  payload: PostAppleAuthPayload,
): Promise<PostAppleAuthResponse> {
  const URL = `/api/v1/oauth/apple`;
  const { data } = await serverAPI.post(URL, payload);

  return data;
}
