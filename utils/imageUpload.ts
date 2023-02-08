// 디버거 모드 활성 시에는 직접 blob 형태로 변환시켜주어서 전달해 줘야 한다.
// 실제 디바이스 기기는 RNDebugger Network formData blob 변환이 안됨. -> 내부에는 다른 스펙을 사용하기 때문.
// see https://github.com/jhen0409/react-native-debugger/blob/master/docs/network-inspect-of-chrome-devtools.md

import { DEBUGGER_MODE, SERVER_ADDRESS } from '@env';
import axios from 'axios';
import { getValueFor } from './secureStore';

interface FormDataBody {
  name: string;
  type: string;
  uri: string;
}

interface AssetState extends FormDataBody {
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

const b64toBlob = (b64Data: string) => {
  const blobData = fetch(b64Data)
    .then(res => res.blob())
    .then(res => {
      console.log(res);

      return res;
    });

  return blobData;
};

/**
 * @requires Authorization Bearer {access-token}
 * @param imagePath 이미지 정보 객체를 전달한다.
 * @returns 업로드된 이미지의 URL
 */
async function imageUpload(imagePath: AssetState): Promise<string> {
  const value: FormDataValue = {
    uri: imagePath.uri,
    type: 'image/jpeg',
    name: 'temp',
  };
  const body = new FormData();

  body.append('image', value as unknown as string | Blob);
  const { imageUrl } = await requestImageUpload(body);

  return imageUrl;
}

export default imageUpload;
