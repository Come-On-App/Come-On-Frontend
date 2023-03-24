import { copy } from '@utils/fn';
import { store } from '@app/store';
import { SERVER_ADDRESS } from '@env';
import { errorAlert } from '@utils/alert';
import { logout } from '@features/authSlice';
import { SocialLoginProps } from '@type/index';
import { serverAxios } from '@api/axiosInstance';
import { requestPostRefreshToken } from '@api/user/user';
import { deleteValueFor, getValueFor } from '@utils/secureStore';
import { getToken, setTokensToDB, StoreKey } from '@api/token/token';

serverAxios.interceptors.request.use(
  async config => {
    const accessToken = await getToken();
    const configCopy = copy(config);

    if (accessToken) configCopy.headers.Authorization = `Bearer ${accessToken}`;

    return configCopy;
  },
  error => error,
);
const { dispatch } = store;

serverAxios.interceptors.response.use(
  res => res,
  async err => {
    const {
      config,
      response: { data, status },
    } = err;
    const URL = `${SERVER_ADDRESS}/api/v1/auth/reissue`;

    if (config.url === URL || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    // 헤더가 없는 경우 => 로그인 요청
    if (data.errorCode === 1102) {
      errorAlert('인증헤더를 찾을 수 없습니다. 다시 로그인해 주세요');

      return config;
    }

    // 액세스 토큰이 만료된 경우 => 리프레쉬 토큰 발급
    if (data.errorCode === 1103) {
      await deleteValueFor(StoreKey.accessToken);

      const result = await postRefreshToken();

      if (!result) {
        dispatch(logout());
        errorAlert('로그인 해주세요');
      }

      return config;
    }

    return Promise.reject(err);
  },
);

// 소셜로그인
export const setLogin = async (data: SocialLoginProps) => {
  console.log('set', `${SERVER_ADDRESS}${data.url}`);

  const res = await serverAxios.post(`${SERVER_ADDRESS}${data.url}`, data.data);

  if (res.status === 200) {
    const tokenDatas = await res.data;

    serverAxios.defaults.headers.common.Authorization = `Bearer ${tokenDatas.accessToken.token}`;

    await setTokensToDB(tokenDatas);

    return tokenDatas;
  }

  return res;
};

export const postRefreshToken = async () => {
  const refreshTokens = await getValueFor(StoreKey.refreshToken);
  const refreshToken = refreshTokens && (await JSON.parse(refreshTokens));
  const data = requestPostRefreshToken({ refreshToken })
    .then(async tokenData => {
      if (tokenData) {
        await setTokensToDB(tokenData);
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
