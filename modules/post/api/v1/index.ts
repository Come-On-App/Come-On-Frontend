import { comeonApiAxios } from '@app/api/axiosInstance';
import {
  GetEntryCodePayload,
  GetEntryCodeResponse,
  PostEntryCodePayalod,
  PostEntryCodeResponse,
} from './type';

/**
 * @see https://api.come-on.me/docs/meeting/index.html#entry-code-details
 * GET /api/v1/meetings/{meeting-id}/entry-code 모임 입장 코드 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 입장 코드를 조회할 모임의 식별값
 * @returns 모임 입장 코드 정보
 */
export async function requestGetEntryCode(
  payload: GetEntryCodePayload,
): Promise<GetEntryCodeResponse> {
  const URL = `/api/v1/meetings/${payload}/entry-code`;
  const { data } = await comeonApiAxios.get(URL);

  return data;
}

/**
 * POST /api/v1/meetings/{meeting-id}/entry-code 모임 입장 코드 갱신
 * @requires Authorization Bearer {access-token}
 * @param payload 입장 코드를 조회할 모임의 식별값
 * @returns 모임 입장 코드 정보
 */
export async function requestPostEntryCode(
  payload: PostEntryCodePayalod,
): Promise<PostEntryCodeResponse> {
  const URL = `/api/v1/meetings/${payload}/entry-code`;
  const { data } = await comeonApiAxios.post(URL);

  return data;
}
