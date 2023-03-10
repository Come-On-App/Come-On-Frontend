import { serverAxios } from '@api/axiosInstance';
import type {
  DeleteMeetingPlacePayload,
  DeleteMeetingPlaceResponse,
  GetMeetingPlacesListResponse,
  GetMeetingPlacesPayalod,
  PostAddMeetingPlacesPayload,
  PostAddMeetingPlacesResponse,
  PostMeetingPlacesLockPayload,
  PostMeetingPlacesLockResponse,
  PutUpdateMeetingPlacesPayload,
  PutUpdateMeetingPlacesPayload2,
  PutUpdateMeetingPlacesResponse,
  PutUpdateMeetingPlacesResponse2,
} from '@type/api.meeting';

/**
 * GET /api/v1/meetings/{meeting-id}/places 모임 장소 리스트 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 장소 리스트를 조회하려는 모임의 식별값
 * @returns 모임 장소 리스트
 */
export async function requestMeetingPlaces(
  payload: GetMeetingPlacesPayalod,
  signal?: AbortSignal,
): Promise<GetMeetingPlacesListResponse> {
  const URL = `/api/v1/meetings/${payload}/places`;
  const { data } = await serverAxios.get(URL, {
    signal: signal || undefined,
  });

  return data;
}

/**
 * POST /api/v1/meetings/{meeting-id}/places 모임에 장소 추가
 * @requires Authorization Bearer {access-token}
 * @param payload 장소를 추가하려는 모임의 식별값, 요청 필드
 * @returns 추가된 장소의 식별값
 */
export async function requestAddMeetingPlaces({
  meetingId,
  payload,
}: PostAddMeetingPlacesPayload): Promise<PostAddMeetingPlacesResponse> {
  const URL = `/api/v1/meetings/${meetingId}/places`;
  const { data } = await serverAxios.post(URL, payload);

  return data;
}

/**
 * PUT /api/v1/meetings/{meeting-id}/places/{place-id} 모임 장소 수정
 * @requires Authorization Bearer {access-token}
 * @param payload 수정하려는 장소가 포함된 모임의 식별값, 수정할 장소의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestUpdateMeetingPlaces({
  meetingId,
  placeId,
  payload,
}: PutUpdateMeetingPlacesPayload): Promise<PutUpdateMeetingPlacesResponse> {
  const URL = `/api/v1/meetings/${meetingId}/places/${placeId}`;
  const { data } = await serverAxios.put(URL, payload);

  return data;
}

/**
 * DELETE /api/v1/meetings/{meeting-id}/places/{place-id} 모임 장소 삭제
 * @requires Authorization Bearer {access-token}
 * @param payload 삭제하려는 장소가 포함된 모임의 식별값, 삭제할 장소의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestDeleteMeetingPlaces({
  meetingId,
  placeId,
}: DeleteMeetingPlacePayload): Promise<DeleteMeetingPlaceResponse> {
  const URL = `/api/v1/meetings/${meetingId}/places/${placeId}`;
  const { data } = await serverAxios.delete(URL);

  return data;
}

/**
 * PUT /api/v2/meetings/{meeting-id}/places/{place-id} 모임 장소 수정 V2
 * @requires Authorization Bearer {access-token}
 * @param payload 수정하려는 장소가 포함된 모임의 식별값, 수정할 장소의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestUpdateMeetingPlaces2({
  meetingId,
  placeId,
  payload,
}: PutUpdateMeetingPlacesPayload2): Promise<PutUpdateMeetingPlacesResponse2> {
  const URL = `/api/v2/meetings/${meetingId}/places/${placeId}`;
  const { data } = await serverAxios.put(URL, payload);

  return data;
}

/**
 * POST /api/v2/meetings/{meeting-id}/places/{place-id}/lock 모임 장소 락
 * @requires Authorization Bearer {access-token}
 * @param payload 락을 등록할 장소가 포함된 모임의 식별값, 락을 등록할 장소의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestPostMeetingPlacesLock({
  meetingId,
  placeId,
}: PostMeetingPlacesLockPayload): Promise<PostMeetingPlacesLockResponse> {
  const URL = `/api/v2/meetings/${meetingId}/places/${placeId}/lock`;
  const { data } = await serverAxios.post(URL);

  return data;
}

/**
 * POST /api/v2/meetings/{meeting-id}/places/{place-id}/unlock 모임 장소 락 해제
 * @requires Authorization Bearer {access-token}
 * @param payload 락을 해제할 장소가 포함된 모임의 식별값, 락을 해제할 장소의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestPostMeetingPlacesUnLock({
  meetingId,
  placeId,
}: PostMeetingPlacesLockPayload): Promise<PostMeetingPlacesLockResponse> {
  const URL = `/api/v2/meetings/${meetingId}/places/${placeId}/unlock`;
  const { data } = await serverAxios.post(URL);

  return data;
}
