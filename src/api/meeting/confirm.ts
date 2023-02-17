import { serverAxios } from '@api/axiosInstance';
import type {
  GetConfirmMeetingDatePayload,
  GetConfirmMeetingDateResponse,
  PostConfirmMeetingDatePayload,
  PostConfirmMeetingDateResponse,
} from '@type/api.meeting';

/**
 * POST /api/v1/meetings/{meeting-id}/date/confirm 모임일 확정
 * @requires Authorization Bearer {access-token}
 * @param payload 모임일을 확정할 모임의 식별값, 시작 일자, 종료 일자
 * @returns 모임일 확정이 성공적으로 완료되었는지 여부
 */
export async function requestConfirmMeetingDate({
  meetingId,
  payload,
}: PostConfirmMeetingDatePayload): Promise<PostConfirmMeetingDateResponse> {
  const URL = `/api/v1/meetings/${meetingId}/date/confirm`;
  const { data } = await serverAxios.post(URL, payload, {
    headers: {},
  });

  return data;
}

/**
 * GET /api/v1/meetings/{meeting-id}/date/confirm 확정된 모임일 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 투표를 등록할 모임의 식별값
 * @returns 확정된 모임일 정보
 */
export async function requestGetConfirmMeetingDate(
  payload: GetConfirmMeetingDatePayload,
): Promise<GetConfirmMeetingDateResponse> {
  const URL = `/api/v1/meetings/${payload}/date/confirm`;
  const { data } = await serverAxios.post(URL, payload, {
    headers: {},
  });

  return data;
}
