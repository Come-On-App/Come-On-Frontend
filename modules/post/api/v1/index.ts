import { comeonApiAxios } from '@app/api/axiosInstance';
import { ImagePickerAsset } from 'expo-image-picker';
import { vigilAsync } from 'promise-vigilant';
import { createImageFormData, getAssetState, getImageUrl } from '@shared/utils';
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
  PostUploadImagePayload,
  PostUploadImageResponse,
} from './type';

/**
 * @see https://api.come-on.me/docs/meeting/index.html#entry-code-details
 * GET /api/v1/meetings/{meeting-id}/entry-code 모임 입장 코드 조회
 * @requires Authorization Bearer {access-token}
 * @param payload 입장 코드를 조회할 모임의 식별값
 * @returns 모임 입장 코드 정보
 */
export async function requestGetEntryCode(
  payload: GetEntryCodePayload,
): Promise<GetEntryCodeResponse> {
  const URL = `/api/v1/meetings/${payload}/entry-code`;
  const { data } = await comeonApiAxios.get(URL);

  return data;
}

/**
 * @see https://api.come-on.me/docs/meeting/index.html#entry-code-renew
 * POST /api/v1/meetings/{meeting-id}/entry-code 모임 입장 코드 갱신
 * @requires Authorization Bearer {access-token}
 * @param payload 입장 코드를 조회할 모임의 식별값
 * @returns 모임 입장 코드 정보
 */
export async function requestPostEntryCode(
  payload: PostEntryCodePayalod,
): Promise<PostEntryCodeResponse> {
  const URL = `/api/v1/meetings/${payload}/entry-code`;
  const { data } = await comeonApiAxios.post(URL);

  return data;
}

/**
 * @see https://api.come-on.me/docs/meeting/index.html#meeting-add
 * POST /api/v1/meetings 모임 등록
 * @requires Authorization Bearer {access-token}
 * @param payload 모임 생성에 필요한 정보를 전달한다.
 * @returns 생성된 모임의 식별값
 */
export async function requestCreateMeetings(
  payload: PostMeetingPayload,
): Promise<PostMeetingResponse> {
  const URL = '/api/v1/meetings';
  const { data } = await comeonApiAxios.post(URL, payload);

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
  const { data } = await comeonApiAxios.post(URL, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

/**
 * 이미지를 form 형식에 맞게 변환 후 유효한 URL을 요청한다.
 */
export async function requestImageUpload(
  imagePickerAsset: ImagePickerAsset,
): Promise<string> {
  return vigilAsync(imagePickerAsset, [
    getAssetState,
    createImageFormData,
    requestUploadImage,
    getImageUrl,
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
  const { data } = await comeonApiAxios.delete(URL);

  return data;
}

/**
 * PATCH  /api/v1/meetings/{meeting-id} 모임 수정
 * @requires Authorization Bearer {access-token}
 * @param payload 수정할 모임정보
 * @returns slice Response 형식 응답값
 */
export async function requestPatchMeetings({
  meetingId,
  payload,
}: PatchMeetingPayload): Promise<PatchMeetingResponse> {
  const URL = `/api/v1/meetings/${meetingId}`;
  const { data } = await comeonApiAxios.patch(URL, payload);

  return data;
}
