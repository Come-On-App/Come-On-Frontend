/* eslint-disable import/prefer-default-export */
import { serverAPI } from '@app/api/axiosInstance';
import { GetMyInfoResponse } from './type';

/**
 * GET /api/v2/users/me 내 정보 조회 (V2)
 * @requires Authorization Bearer {access-token}
 * @returns 내 정보
 */
export async function requestGetMyInfo(
  signal?: AbortSignal,
): Promise<GetMyInfoResponse> {
  const URL = `/api/v2/users/me`;
  const { data } = await serverAPI.get(URL, { signal });

  return data;
}
