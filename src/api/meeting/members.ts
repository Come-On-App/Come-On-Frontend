/* eslint-disable import/prefer-default-export */

import { serverAxios } from '@api/axiosInstance';
import type {
  DeleteMeetingPayload,
  DeleteMeetingResponse,
  GetMeetingMembersListResponse,
  GetMeetingMembersPayload,
} from '@type/api.meeting';

/**
 * GET /api/v1/meetings/{meeting-id}/members 모임 회원 리스트 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 모임의 식별값
 * @returns 모임 회원 리스트
 */
export async function requestMeetingMembers(
  payload: GetMeetingMembersPayload,
  signal?: AbortSignal,
): Promise<GetMeetingMembersListResponse> {
  const URL = `/api/v1/meetings/${payload}/members`;
  const { data } = await serverAxios.get(URL, {
    signal: signal || undefined,
  });

  return data;
}

// TODO: GET /api/v1/meetings/{meeting-id}/members/me 특정 모임에서 내 모임원 정보 조회

/**
 * DELETE /api/v1/meetings/{meeting-id}/members/me 모임 탈퇴
 * @requires Authorization Bearer {access-token}
 * @param payload 탈퇴할 모임의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestDeleteMeeting(
  payload: DeleteMeetingPayload,
): Promise<DeleteMeetingResponse> {
  const URL = `/api/v1/meetings/${payload}/members/me`;
  const { data } = await serverAxios.delete(URL);

  return data;
}
