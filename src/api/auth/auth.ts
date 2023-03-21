import { SERVER_ADDRESS } from '@env';
import { serverAxios } from '@api/axiosInstance';
import { SocialLoginProps } from '@type/index';
import { deleteValueFor, getValueFor } from '@utils/secureStore';
import { getToken, setTokensToDB, StoreKey } from '@api/token/token';
import { copy } from '@utils/fn';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { requestPostRefreshToken } from '@api/user/user';
import { store } from '@app/store';
import { logout } from '@features/authSlice';

serverAxios.interceptors.request.use(
  async config => {
    const accessToken = await getToken();
    const configCopy = copy(config);

    if (accessToken) configCopy.headers.Authorization = `Bearer ${accessToken}`;

    return configCopy;
  },
  error => error,
);
const { dispatch } = store; // direct access to redux store.

serverAxios.interceptors.response.use(
  res => res,
  async err => {
    const {
      config,
      response: { data },
    } = err;
    const URL = `${SERVER_ADDRESS}/api/v1/auth/reissue`;

    console.log(err.response);

    if (config.url === URL || config.sent) {
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
      await deleteValueFor(StoreKey.accessToken);

      const result = await postRefreshToken();

      if (!result) dispatch(logout());

      return config;
    }

    // 리프레쉬 토큰이 만료된 경우

    return Promise.reject(err);
  },
);

// 소셜로그인
export const setLogin = async (data: SocialLoginProps) => {
  const res = await serverAxios.post(
    `${SERVER_ADDRESS}${data.url}`,
    data.data,
    { headers: { 'Cache-Control': 'no-store' } },
  );

  if (res.status === 200) {
    const tokenDatas = await res.data;

    console.log(tokenDatas);
    serverAxios.defaults.headers.common.Authorization = `Bearer ${tokenDatas.accessToken.token}`;

    await setTokensToDB(tokenDatas);

    return tokenDatas;
  }

  return res;
};

//  만료 테스트 하기
export const postRefreshToken = async () => {
  const refreshTokens = await getValueFor(StoreKey.refreshToken);
  const refreshToken = refreshTokens && (await JSON.parse(refreshTokens));
  // invalidateQueries([QueryKeys.user]);
  const data = requestPostRefreshToken({ refreshToken })
    .then(async tokenData => {
      if (tokenData) {
        await setTokensToDB(tokenData);
        console.log('tokenData is true');
      }

      return true;
    })
    .catch(async err => {
      if (err.errorCode === 4002) {
        await deleteValueFor(StoreKey.refreshToken);
      }

      return false;
    });

  return data;
};

export function setAuthorizationHeader(token: string) {
  serverAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
