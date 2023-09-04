/* eslint-disable import/prefer-default-export */

import { serverAPI } from '@app/api/axiosInstance';
import {
  GetMeetingDetailPayload,
  GetMeetingDetailResponse,
  GetMeetingMemberMeResponse,
  GetMeetingMemberMePayload,
  GetMeetingMembersListResponse,
  GetMeetingMembersPayload,
  GetMeetingPayload,
  GetMeetingSliceResponse,
} from './type';

/**
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
  const { data } = await serverAPI.get(URL, {
    params: {
      ...payload,
      size: 100,
    },
    signal,
  });

  return data;
}

/**
 * GET /api/v2/meetings/{meeting-id} 모임 상세 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 조회할 모임의 식별값
 * @returns 모임 상세 정보
 */
export async function requestGetMeetingDetail(
  payload: GetMeetingDetailPayload,
  signal?: AbortSignal,
): Promise<GetMeetingDetailResponse> {
  const URL = `/api/v2/meetings/${payload}`;
  const { data } = await serverAPI.get(URL, { signal });

  return data;
}

/**
 * GET /api/v2/meetings/{meeting-id}/members 모임 회원 리스트 조회 (v2)
 * @requires Authorization Bearer {access-token}
 * @param payload 모임의 식별값
 * @returns 모임 회원 리스트
 */
export async function requestGetMeetingMembers(
  payload: GetMeetingMembersPayload,
  signal?: AbortSignal,
): Promise<GetMeetingMembersListResponse> {
  const URL = `/api/v2/meetings/${payload}/members`;
  const { data } = await serverAPI.get(URL, { signal });

  return data;
}

/**
 * GET /api/v2/meetings/{meeting-id}/members/me 특정 모임에서 내 모임원 정보 조회 V2
 * @requires Authorization Bearer {access-token}
 * @param payload 내 모임원 정보를 조회할 모임의 식별값
 * @returns 회원 정보
 */
export async function requestGetMeetingMemberMe(
  payload: GetMeetingMemberMePayload,
  signal?: AbortSignal,
): Promise<GetMeetingMemberMeResponse> {
  const URL = `/api/v2/meetings/${payload}/members/me`;
  const { data } = await serverAPI.get(URL, { signal });

  return data;
}
