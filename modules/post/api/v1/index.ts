import { serverAPI } from '@app/api/axiosInstance';
import { asyncWave } from 'async-wave';
import type { ImagePickerAsset } from 'expo-image-picker';

import { createImageFormData, getAssetState } from '@shared/utils';
import {
  DeleteMeetingPayload,
  DeleteMeetingResponse,
  GetDateVotingPayload,
  GetDateVotingListResponse,
  GetEntryCodePayload,
  GetEntryCodeResponse,
  PatchMeetingPayload,
  PatchMeetingResponse,
  PostEntryCodePayalod,
  PostEntryCodeResponse,
  PostMeetingPayload,
  PostMeetingResponse,
  PostMeetingTimePayalod,
  PostMeetingTimeResponse,
  PostReportMeetingPayload,
  PostReportMeetingResponse,
  PostUploadImagePayload,
  PostUploadImageResponse,
  GetMeetingTimePayalod,
  GetMeetingTimeResponse,
  GetDateVotingDetailsPayload,
  GetDateVotingDetailsResponse,
  PostDateVotingPayload,
  PostDateVotingResponse,
  DeleteDateVotingPayload,
  DeleteDateVotingResponse,
  PostConfirmMeetingDatePayload,
  PostConfirmMeetingDateResponse,
  DeleteConfirmMeetingDatePayload,
  DeleteConfirmMeetingDateResponse,
  PostAddMeetingPlacePayload,
  PostAddMeetingPlaceResponse,
  GetMeetingPlacePayalod,
  GetMeetingPlaceListResponse,
  PutUpdateMeetingPlacesPayload,
  PutUpdateMeetingPlacesResponse,
  DeleteMeetingPlacePayload,
  DeleteMeetingPlaceResponse,
} from './type';

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
  const { data } = await serverAPI.get(URL);

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
  const { data } = await serverAPI.post(URL);

  return data;
}

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
  const { data } = await serverAPI.post(URL, payload);

  return data;
}

/**
 * POST /api/v1/image 이미지 업로드
 * @requires Authorization Bearer {access-token}
 * @param payload 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
async function requestUploadImage(
  payload: PostUploadImagePayload,
): Promise<PostUploadImageResponse> {
  const URL = '/api/v1/image';
  const { data } = await serverAPI.post(URL, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

/**
 * 이미지 에셋을 유효한 이미지 URL 주소로 변환 요청한다.
 */
export function requestImageURL(asset: ImagePickerAsset): Promise<string> {
  return asyncWave(asset, [
    getAssetState,
    createImageFormData,
    requestUploadImage,
    (response: PostUploadImageResponse) => response.imageUrl,
  ]);
}

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
  const { data } = await serverAPI.delete(URL);

  return data;
}

/**
 * PATCH  /api/v1/meetings/{meeting-id} 모임 수정
 * @requires Authorization Bearer {access-token}
 * @param payload 수정할 모임정보
 * @returns slice Response 형식 응답값
 */
export async function requestPatchMeeting({
  meetingId,
  payload,
}: PatchMeetingPayload): Promise<PatchMeetingResponse> {
  const URL = `/api/v1/meetings/${meetingId}`;
  const { data } = await serverAPI.patch(URL, payload);

  return data;
}

/**
 * POST /api/v1/report/meeting 모임 신고
 * @requires Authorization Bearer {access-token}
 * @param payload 신고할 모임의 관련 정보
 * @returns 생성된 신고 게시물의 식별값
 */
export async function requestPostReportMeeting(
  payload: PostReportMeetingPayload,
): Promise<PostReportMeetingResponse> {
  const URL = `/api/v1/report/meeting`;
  const { data } = await serverAPI.post(URL, payload);

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
  const { data } = await serverAPI.post(URL, {
    meetingStartTime: payload.meetingStartTime,
  });

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
  signal?: AbortSignal,
): Promise<GetDateVotingListResponse> {
  const URL = `/api/v1/meetings/${payload}/date/voting`;
  const { data } = await serverAPI.get(URL, { signal });

  return data;
}

/**
 * GET /api/v1/meetings/{meeting-id}/meeting-time 모임 시간 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 모임 시작 시간을 조회할 모임의 식별값
 * @returns 모임 시작 시간 (HH:mm:ss 형식)
 */
export async function requestGetMeetingTime(
  payload: GetMeetingTimePayalod,
  signal?: AbortSignal,
): Promise<GetMeetingTimeResponse> {
  const URL = `/api/v1/meetings/${payload}/meeting-time`;
  const { data } = await serverAPI.get(URL, { signal });

  return data;
}

/**
 * GET /api/v1/meetings/{meeting-id}/date/voting/details 특정 일자 투표 현황 상세 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 투표 현황을 조회할 모임의 식별값, 조회할 일자
 * @returns 특정 일자 투표 현황 상세 정보
 */
export async function requestGetDateVotingDetails(
  { meetingId, date }: GetDateVotingDetailsPayload,
  signal?: AbortSignal,
): Promise<GetDateVotingDetailsResponse> {
  const URL = `/api/v1/meetings/${meetingId}/date/voting/details`;
  const { data } = await serverAPI.get(URL, {
    params: {
      date,
    },
    signal,
  });

  return data;
}

/**
 * POST /api/v1/meetings/{meeting-id}/date/voting 모임일 투표 등록
 * @requires Authorization Bearer {access-token}
 * @param payload 투표를 등록할 모임의 식별값
 * @returns 투표가 성공적으로 등록되었는지 여부
 */
export async function requestGetAddDateVoting({
  meetingId,
  date,
}: PostDateVotingPayload): Promise<PostDateVotingResponse> {
  const URL = `/api/v1/meetings/${meetingId}/date/voting`;
  const { data } = await serverAPI.post(URL, {
    date,
  });

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
  date,
}: DeleteDateVotingPayload): Promise<DeleteDateVotingResponse> {
  const URL = `/api/v1/meetings/${meetingId}/date/voting`;
  const { data } = await serverAPI.delete(URL, {
    data: {
      date,
    },
  });

  return data;
}

/**
 * POST /api/v1/meetings/{meeting-id}/date/confirm 모임일 확정
 * @requires Authorization Bearer {access-token}
 * @param payload 모임일을 확정할 모임의 식별값, 시작 일자, 종료 일자
 * @returns 모임일 확정이 성공적으로 완료되었는지 여부
 */
export async function requestPostConfirmMeetingDate({
  meetingId,
  meetingDate,
}: PostConfirmMeetingDatePayload): Promise<PostConfirmMeetingDateResponse> {
  const URL = `/api/v1/meetings/${meetingId}/date/confirm`;
  const { data } = await serverAPI.post(URL, meetingDate);

  return data;
}

/**
 * POST /api/v1/meetings/{meeting-id}/date/confirm 모임일 취소
 * @requires Authorization Bearer {access-token}
 * @param payload 모임일을 취소할 모임의 식별값
 * @returns 모임일 취소가 성공적으로 완료되었는지 여부
 */
export async function requestDeleteConfirmMeetingDate(
  meetingId: DeleteConfirmMeetingDatePayload,
): Promise<DeleteConfirmMeetingDateResponse> {
  const URL = `/api/v1/meetings/${meetingId}/date/confirm`;
  const { data } = await serverAPI.delete(URL);

  return data;
}

/**
 * GET /api/v1/meetings/{meeting-id}/places 모임 장소 리스트 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 장소 리스트를 조회하려는 모임의 식별값
 * @returns 모임 장소 리스트
 */
export async function requestMeetingPlaces(
  payload: GetMeetingPlacePayalod,
  signal?: AbortSignal,
): Promise<GetMeetingPlaceListResponse> {
  const URL = `/api/v1/meetings/${payload}/places`;
  const { data } = await serverAPI.get(URL, { signal });

  return data;
}

/**
 * POST /api/v1/meetings/{meeting-id}/places 모임에 장소 추가
 * @requires Authorization Bearer {access-token}
 * @param payload 장소를 추가하려는 모임의 식별값, 요청 필드
 * @returns 추가된 장소의 식별값
 */
export async function requestAddMeetingPlace({
  meetingId,
  payload,
}: PostAddMeetingPlacePayload): Promise<PostAddMeetingPlaceResponse> {
  const URL = `/api/v1/meetings/${meetingId}/places`;
  const { data } = await serverAPI.post(URL, payload);

  return data;
}

/**
 * PUT /api/v1/meetings/{meeting-id}/places/{place-id} 모임 장소 수정
 * @requires Authorization Bearer {access-token}
 * @param payload 수정하려는 장소가 포함된 모임의 식별값, 수정할 장소의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestUpdateMeetingPlace({
  meetingId,
  placeId,
  payload,
}: PutUpdateMeetingPlacesPayload): Promise<PutUpdateMeetingPlacesResponse> {
  const URL = `/api/v1/meetings/${meetingId}/places/${placeId}`;
  const { data } = await serverAPI.put(URL, payload);

  return data;
}

/**
 * DELETE /api/v1/meetings/{meeting-id}/places/{place-id} 모임 장소 삭제
 * @requires Authorization Bearer {access-token}
 * @param payload 삭제하려는 장소가 포함된 모임의 식별값, 삭제할 장소의 식별값
 * @returns 요청 처리 성공 여부
 */
export async function requestDeleteMeetingPlace({
  meetingId,
  placeId,
}: DeleteMeetingPlacePayload): Promise<DeleteMeetingPlaceResponse> {
  const URL = `/api/v1/meetings/${meetingId}/places/${placeId}`;
  const { data } = await serverAPI.delete(URL);

  return data;
}
