import { SERVER_ADDRESS } from '@env';
import { serverAxios } from '@api/axiosInstance';
import { SocialLoginProps } from '@type/index';
import { deleteValueFor, getValueFor } from '@utils/secureStore';
import { getToken, setTokens, StoreKey } from '@api/token/token';
import { copy } from '@utils/fn';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { requestPostRefreshToken } from '@api/user/user';

serverAxios.interceptors.request.use(
  async config => {
    const accessToken = await getToken();
    const configCopy = copy(config);

    if (accessToken) configCopy.headers.Authorization = `Bearer ${accessToken}`;

    return configCopy;
  },
  error => error,
);

serverAxios.interceptors.response.use(
  res => res,
  async err => {
    const {
      config,
      response: { status, data },
    } = err;
    const URL = `${SERVER_ADDRESS}/api/v1/auth/reissue`;

    if (config.url === URL || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    // 헤더가 없는 경우 => 로그인 요청
    if (data.errorCode === 1102) {
      Toast.show({
        type: 'error',
        text1: '로그인 해주세요',
      });
    }

    // 액세스 토큰이 만료된 경우 => 리프레쉬 토큰 발급
    if (data.errorCode === 1103) {
      await postRefreshToken();

      return config;
    }

    // 리프레쉬 토큰이 만료된 경우

    if (data.errorCode === 4002) {
      return Promise.reject(err);
    }

    return Promise.reject(err);
  },
);

// 소셜로그인
export const setLogin = async (data: SocialLoginProps) => {
  const res = await serverAxios.post(`${SERVER_ADDRESS}${data.url}`, data.data);

  if (res.status === 200) {
    const tokenDatas = res.data;

    serverAxios.defaults.headers.common.Authorization = `Bearer ${tokenDatas.accessToken.token}`;

    await setTokens(tokenDatas);
  }

  return res;
};

//  만료 테스트 하기
export const postRefreshToken = async () => {
  const refreshTokens = await getValueFor(StoreKey.refreshToken);
  const refreshToken = refreshTokens && JSON.parse(refreshTokens);
  const data = await requestPostRefreshToken({ refreshToken });

  if (data.errorCode === 4002) {
    await deleteValueFor(StoreKey.accessToken);
    await deleteValueFor(StoreKey.refreshToken);
  }

  if (data.accessToken && data) {
    await setTokens(data);
  }

  return data;
};

export function setAuthorizationHeader(token: string) {
  serverAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
