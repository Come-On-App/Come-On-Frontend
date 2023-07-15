/* eslint-disable import/prefer-default-export */

import { comeonApiAxios } from '@app/api/axiosInstance';
import { GetMeetingPayload, GetMeetingSliceResponse } from './type';

/**
 * @see https://api.come-on.me/docs/meeting/index.html#meeting-list-v2
 * GET /api/v2/meetings 모임 리스트 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 모임 리스트 필터링 옵션 (필수값 X)
 * @returns slice Response 형식 응답값
 */
export async function requestGetMeetings(
  payload?: Partial<GetMeetingPayload>,
  signal?: AbortSignal,
): Promise<GetMeetingSliceResponse> {
  const URL = '/api/v2/meetings';
  const { data } = await comeonApiAxios.get(URL, {
    params: {
      ...payload,
      size: 100,
    },
    signal,
  });

  return data;
}
