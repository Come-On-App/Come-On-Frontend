import fn from '@utils/fn';
import axios, { AxiosRequestConfig } from 'axios';

import type { AssetState } from '@hooks/useImagePicker';
import type { FormDataValue } from '@type/api.image';

export function getFileName(uri: string) {
  const emptyFileName = 'noname.jpg';
  const fileName = uri.split('/').pop();

  if (fn.isEmpty(fileName)) {
    return emptyFileName;
  }

  return fileName;
}

export function inferTypeImage(fileName: string) {
  const match = /\.(\w+)$/.exec(fileName);
  const imageType = match ? `image/${match[1]}` : `image`;

  return imageType;
}

// 수동으로 blob 변환이 필요할떄 true로 할당한다.
const MANUAL_CONVERSION = true;
const config = {
  responseType: 'blob',
  responseEncoding: 'binary',
} as AxiosRequestConfig;

export async function convertImageFormData(
  asset: AssetState,
): Promise<FormDataValue> {
  if (!MANUAL_CONVERSION) return fn.pick(['name', 'type', 'uri'], asset);

  // 디버거 모드 활성 시에는 직접 blob 형태로 변환후 전달해 줘야 한다.
  // @see https://github.com/jhen0409/react-native-debugger/blob/master/docs/network-inspect-of-chrome-devtools.md#limitations
  const { data } = await axios.get(asset.uri, config).catch(() => {
    return {
      data: null,
    };
  });

  // 첫 번째 시도가 실패한다면 두 번째 방법으로 시도한다.
  if (fn.isNull(data)) {
    const { data: blob } = await axios.get(
      `data:${asset.type};base64,${asset.base64}`,
      config,
    );

    return blob;
  }

  return data;
}

export function createImageFormData(imageFormData: string | Blob) {
  const KEY = 'image';
  const body = new FormData();

  body.append(KEY, imageFormData);

  return body;
}
