import { serverAxios } from '@api/axiosInstance';
import type {
  DeleteDateVotingPayload,
  DeleteDateVotingResponse,
  GetDateVotingPayload,
  GetDateVotingListResponse,
  PostDateVotingPayload,
  PostDateVotingResponse,
  GetDateVotingDetailsPayload,
} from '@type/api.meeting';

/**
 * POST /api/v1/meetings/{meeting-id}/date/voting 모임일 투표 등록
 * @requires Authorization Bearer {access-token}
 * @param payload 투표를 등록할 모임의 식별값
 * @returns 투표가 성공적으로 등록되었는지 여부
 */
export async function requestAddDateVoting({
  meetingId,
  payload,
}: PostDateVotingPayload): Promise<PostDateVotingResponse> {
  const URL = `/api/v1/meetings/${meetingId}/places`;
  const { data } = await serverAxios.post(URL, payload);

  return data;
}

/**
 * DELETE /api/v1/meetings/{meeting-id}/date/voting 모임일 투표 삭제
 * @requires Authorization Bearer {access-token}
 * @param payload 삭제하려는 장소가 포함된 모임의 식별값, 삭제할 장소의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestDeleteDateVoting({
  meetingId,
  payload,
}: DeleteDateVotingPayload): Promise<DeleteDateVotingResponse> {
  const URL = `/api/v1/meetings/${meetingId}/date/voting`;
  const { data } = await serverAxios.post(URL, payload);

  return data;
}

/**
 * GET /api/v1/meetings/{meeting-id}/date/voting 모임일 투표 현황 리스트 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 투표 현황을 조회할 모임의 식별값
 * @returns 투표 현황 정보
 */
export async function requestGetDateVoting(
  payload: GetDateVotingPayload,
): Promise<GetDateVotingListResponse> {
  const URL = `/api/v1/meetings/${payload}/date/voting`;
  const { data } = await serverAxios.get(URL);

  return data;
}

/**
 * GET /api/v1/meetings/{meeting-id}/date/voting/details 특정 일자 투표 현황 상세 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 투표 현황을 조회할 모임의 식별값, 조회할 일자
 * @returns 특정 일자 투표 현황 상세 정보
 */
export async function requestGetDateVotingDetails({
  meetingId,
  payload,
}: GetDateVotingDetailsPayload): Promise<GetDateVotingListResponse> {
  const URL = `/api/v1/meetings/${meetingId}/date/voting/details`;
  const { data } = await serverAxios.get(URL, {
    params: {
      date: payload.date,
    },
  });

  return data;
}
