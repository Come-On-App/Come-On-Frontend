import { serverAPI } from '@app/api/axiosInstance';
import { ImagePickerAsset } from 'expo-image-picker';
import { asyncWave } from 'async-wave';
import { createImageFormData, getAssetState } from '@shared/utils';
import {
  DeleteMeetingPayload,
  DeleteMeetingResponse,
  GetEntryCodePayload,
  GetEntryCodeResponse,
  PatchMeetingPayload,
  PatchMeetingResponse,
  PostEntryCodePayalod,
  PostEntryCodeResponse,
  PostMeetingPayload,
  PostMeetingResponse,
  PostReportMeetingPayload,
  PostReportMeetingResponse,
  PostUploadImagePayload,
  PostUploadImageResponse,
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
