import { serverAxios } from '@api/axiosInstance';
import type {
  GetEntryCodePayload,
  GetEntryCodeResponse,
  GetMeetingDetailPayload,
  GetMeetingDetailResponse,
  GetMeetingDetailResponse2,
  GetMeetingPayload,
  GetMeetingSliceResponse,
  PatchMeetingPayload,
  PatchMeetingResponse,
  PostEntryCodePayalod,
  PostEntryCodeResponse,
  PostJoinPayload,
  PostJoinResponse,
  PostMeetingPayload,
  PostMeetingResponse,
  PostMeetingTimePayalod,
  PostMeetingTimeResponse,
} from '@type/api.meeting';

/**
 * POST /api/v1/meetings 모임 등록
 * @requires Authorization Bearer {access-token}
 * @param payload 모임 생성에 필요한 정보를 전달한다.
 * @returns 생성된 모임의 식별값
 */
export async function requestCreateMeetings(
  payload: PostMeetingPayload,
): Promise<PostMeetingResponse> {
  const URL = '/api/v1/meetings';
  const { data } = await serverAxios.post(URL, payload);

  return data;
}

/**
 * PATCH  /api/v1/meetings/{meeting-id} 모임 수정
 * @requires Authorization Bearer {access-token}
 * @param payload 수정할 모임정보
 * @returns slice Response 형식 응답값
 */
export async function requestPatchMeetings(
  payload: PatchMeetingPayload,
): Promise<PatchMeetingResponse> {
  const URL = `/api/v1/meetings/${payload.meetingId}`;
  const { data } = await serverAxios.patch(URL, payload.meetingData);

  return data;
}

/**
 * GET /api/v1/meetings 모임 리스트 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 모임 리스트 필터링 옵션 (필수값 X)
 * @returns slice Response 형식 응답값
 */
export async function requestGetMeetings(
  payload?: Partial<GetMeetingPayload>,
): Promise<GetMeetingSliceResponse> {
  const URL = '/api/v1/meetings';
  const { data } = await serverAxios.get(URL, {
    params: {
      ...payload,
      size: 100,
    },
  });

  return data;
}

/**
 * GET /api/v1/meetings/{meeting-id} 모임 상세 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 조회할 모임의 식별값
 * @returns 모임 상세 정보
 */
export async function requestGetMeetingDetail(
  payload: GetMeetingDetailPayload,
): Promise<GetMeetingDetailResponse> {
  const URL = `/api/v1/meetings/${payload}`;
  const { data } = await serverAxios.get(URL);

  return data;
}

/**
 * GET /api/v2/meetings/{meeting-id} 모임 상세 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 조회할 모임의 식별값
 * @returns 모임 상세 정보
 */
export async function requestGetMeetingDetail2(
  payload: GetMeetingDetailPayload,
): Promise<GetMeetingDetailResponse2> {
  const URL = `/api/v1/meetings/${payload}`;
  const { data } = await serverAxios.get(URL);

  return data;
}

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
  const { data } = await serverAxios.post(URL, payload);

  return data;
}

/**
 * GET /api/v1/meetings/{meeting-id}/entry-code 모임 입장 코드 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 입장 코드를 조회할 모임의 식별값
 * @returns 모임 입장 코드 정보
 */
export async function requestGetEntryCode(
  payload: GetEntryCodePayload,
): Promise<GetEntryCodeResponse> {
  const URL = `/api/v1/meetings/${payload}/entry-code`;
  const { data } = await serverAxios.get(URL);

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
  const { data } = await serverAxios.post(URL);

  return data;
}

/**
 * POST /api/v1/meetings/{meeting-id}/meeting-time 모임 시간 변경
 * @requires Authorization Bearer {access-token}
 * @param payload 모임 시간을 변경할 모임의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestPostMeetingTime(
  payload: PostMeetingTimePayalod,
): Promise<PostMeetingTimeResponse> {
  const URL = `/api/v1/meetings/${payload.meetingId}/meeting-time`;
  const { data } = await serverAxios.post(URL, {
    meetingStartTime: payload.meetingStartTime,
  });

  return data;
}
