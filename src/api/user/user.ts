import { serverAxios } from '@api/axiosInstance';
import type {
  GetMyInfoResponse,
  PostAppleResponse,
  PostReissuePayload,
  PostReissueResponse,
  PutMyInfoPayload,
  PutMyInfoResponse,
  PostApplePayload,
  GetMyInfoResponse2,
  DeleteWithdrawResponse,
} from '@type/api.user';

/**
 * GET /api/v1/users/me 내 정보 조회
 * @requires Authorization Bearer {access-token}
 * @returns 내 정보
 */
export async function requestGetMyInfo(
  signal?: AbortSignal,
): Promise<GetMyInfoResponse> {
  const URL = `/api/v1/users/me`;
  const { data } = await serverAxios.get(URL, {
    signal: signal || undefined,
  });

  return data;
}

/**
 * GET /api/v2/users/me 내 정보 조회 (V2)
 * @requires Authorization Bearer {access-token}
 * @returns 내 정보
 */
export async function requestGetMyInfo2(
  signal?: AbortSignal,
): Promise<GetMyInfoResponse2> {
  const URL = `/api/v2/users/me`;
  const { data } = await serverAxios.get(URL, {
    signal: signal || undefined,
  });

  return data;
}

/**
 * PUT /api/v1/users/me 내 정보 수정
 * @requires Authorization Bearer {access-token}
 * @param payload 변경할 닉네임, 프로필 이미지
 * @returns 요청 처리 성공 여부
 */
export async function requestUpdateMyInfo(
  payload: PutMyInfoPayload,
): Promise<PutMyInfoResponse> {
  const URL = `/api/v1/users/me`;
  const { data } = await serverAxios.put(URL, payload);

  return data;
}

export async function requestPostRefreshToken(
  payload: PostReissuePayload,
): Promise<PostReissueResponse> {
  const URL = '/api/v1/auth/reissue';
  const { data } = await serverAxios.post(URL, {
    refreshToken: payload.refreshToken.token,
    reissueRefreshTokenAlways: true,
  });

  return data;
}

/**
 * POST /api/v1/oauth/apple 애플 로그인
 * @requires Authorization Bearer {access-token}
 * @param payload 애플 로그인 성공시 응답 객체
 * @returns accessToken, refreshToken 객체
 */
export async function requestPostApple(
  payload: PostApplePayload,
): Promise<PostAppleResponse> {
  const URL = `/api/v1/oauth/apple`;
  const { data } = await serverAxios.post(URL, payload);

  return data;
}

/**
 * POST /api/v1/oauth/apple 애플 로그인
 * @requires Authorization Bearer {access-token}
 * @returns success :boolean
 */
export async function requestWithDraw(): Promise<DeleteWithdrawResponse> {
  const URL = `/api/v1/users/me`;
  const { data } = await serverAxios.delete(URL);

  return data;
}
