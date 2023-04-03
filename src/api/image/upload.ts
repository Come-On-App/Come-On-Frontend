import { promiseFlow } from '@utils/promise';
import { serverAxios } from '@api/axiosInstance';
import { convertImageFormData, createImageFormData } from '@utils/image';

import type {
  PostUploadImagePayload,
  PostUploadImageResponse,
} from '@type/api.image';
import { AssetState } from '@type/hook.imagePicker';

function getImageUrl(item: PostUploadImageResponse) {
  return item.imageUrl;
}

/**
 * POST /api/v1/image 이미지 업로드
 * @requires Authorization Bearer {access-token}
 * @param payload 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export async function requestUploadImage(
  payload: PostUploadImagePayload,
): Promise<PostUploadImageResponse> {
  const URL = '/api/v1/image';
  const { data } = await serverAxios.post(URL, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export async function requestImageUpload(
  imagePath: AssetState,
): Promise<string | null> {
  return promiseFlow(imagePath, [
    convertImageFormData,
    createImageFormData,
    requestUploadImage,
    getImageUrl,
  ]);
}

export async function imageURLConversion(assetState: AssetState | null) {
  const imageURL = assetState ? await requestImageUpload(assetState) : null;

  return imageURL;
}
