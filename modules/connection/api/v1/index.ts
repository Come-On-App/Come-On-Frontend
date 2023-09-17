/* eslint-disable import/prefer-default-export */
import { serverAPI } from '@app/api/axiosInstance';
import { PostJoinPayload, PostJoinResponse } from './type';

/**
 * POST /api/v1/meetings/join 모임 가입
 * @requires Authorization Bearer {access-token}
 * @param payload 모임 입장 코드
 * @returns 모임 정보
 */
export async function requestMeetingJoin(
  payload: PostJoinPayload,
): Promise<PostJoinResponse> {
  const URL = `/api/v1/meetings/join`;
  const { data } = await serverAPI.post(URL, payload);

  return data;
}
