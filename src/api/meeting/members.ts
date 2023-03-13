/* eslint-disable import/prefer-default-export */

import { serverAxios } from '@api/axiosInstance';
import type {
  GetMeetingMembersListResponse,
  GetMeetingMembersPayload,
  PostMeetingMembersDropPayload,
  PostMeetingMembersDropResponse,
} from '@type/api.meeting';

/**
 * GET /api/v1/meetings/{meeting-id}/members 모임 회원 리스트 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 모임의 식별값
 * @returns 모임 회원 리스트
 */
export async function requestMeetingMembers(
  payload: GetMeetingMembersPayload,
): Promise<GetMeetingMembersListResponse> {
  const URL = `/api/v1/meetings/${payload}/members`;
  const { data } = await serverAxios.get(URL);

  return data;
}

// TODO: GET /api/v1/meetings/{meeting-id}/members/me 특정 모임에서 내 모임원 정보 조회

// TODO: DELETE /api/v1/meetings/{meeting-id}/members/me 모임 탈퇴
export async function requestMeetingMembersDrop(
  payload: PostMeetingMembersDropPayload,
): Promise<PostMeetingMembersDropResponse> {
  const URL = `/api/v1/meetings/${payload.meetingId}/members/drop`;
  const { data } = await serverAxios.post(URL, {
    targetUserId: payload.targetUserId,
  });

  return data;
}
