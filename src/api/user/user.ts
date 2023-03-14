import { serverAxios } from '@api/axiosInstance';
import type {
  GetMyInfoResponse,
  PostReissuePayload,
  PostReissueResponse,
  PutMyInfoPayload,
  PutMyInfoResponse,
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
