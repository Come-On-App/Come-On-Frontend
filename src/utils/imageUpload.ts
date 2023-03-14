import fn from '@utils/fn';
import axios, { AxiosRequestConfig } from 'axios';
// 디버거 모드 활성 시에는 직접 blob 형태로 변환시켜주어서 전달해 줘야 한다.
// 실제 디바이스 기기는 RNDebugger Network formData blob 변환이 안됨. -> 내부에는 다른 스펙을 사용하기 때문.
// see https://github.com/jhen0409/react-native-debugger/blob/master/docs/network-inspect-of-chrome-devtools.md

import { DEBUGGER_MODE, SERVER_ADDRESS } from '@env';
import { getValueFor } from './secureStore';

interface FormDataBody {
  name: string;
  type: string;
  uri: string;
}

export interface AssetState extends FormDataBody {
  assetId: string | null | undefined;
  base64?: string;
}

type FormDataValue = FormDataBody | Blob;

interface POST_IMAGE {
  imageUrl: string;
}

export function getFileName(uri: string): string {
  const emptyFileName = 'noname.jpg';
  const fileName = uri.split('/').pop();

  if (!fileName) {
    return emptyFileName;
  }

  return fileName;
}

export function inferTypeImage(fileName: string): string {
  const match = /\.(\w+)$/.exec(fileName);
  const imageType = match ? `image/${match[1]}` : `image`;

  return imageType;
}

export async function convertImageBlob(path: AssetState): Promise<Blob> {
  const { data } = await axios.get(path.uri, {
    responseType: 'blob',
    responseEncoding: 'binary',
  });

  return data;
}

async function requestImageUpload(body: FormData): Promise<POST_IMAGE> {
  const tokenData = await getValueFor('accessToken');
  const token = await JSON.parse(tokenData!);
  const URL = `${SERVER_ADDRESS}/api/v1/image`;
  const { data } = await axios.post(URL, body, {
    headers: {
      Authorization: `Bearer ${token.token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

/**
 * @requires Authorization Bearer {access-token}
 * @param imagePath 이미지 정보 객체를 전달한다.
 * @returns 업로드된 이미지의 URL
 */

async function imageUpload(imagePath: AssetState): Promise<string> {
  const value: FormDataValue = {
    uri: imagePath.uri,
    type: 'image/jpeg',
    name: 'noname',
  };
  const body = new FormData();
  const vvalue = await convertImageFormData(imagePath);

  body.append('image', vvalue as unknown as string | Blob);
  const { imageUrl } = await requestImageUpload(body);

  return imageUrl;
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

export default imageUpload;
