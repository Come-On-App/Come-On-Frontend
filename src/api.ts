import Toast from 'react-native-toast-message';
import {
  AuthResponse,
  ErrorType,
  MeetingInfo,
  returnToken,
  SocialLoginProps,
} from '@type/index';
import { serverAxios } from '@api/axiosInstance';
import { SERVER_ADDRESS } from '@env';
import { copy } from './utils/fn';
import { getValueFor, save } from './utils/secureStore';

enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}
type MeetingId = {
  meetingId: number;
};

function setAuthorizationHeader(token: string) {
  serverAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const getToken = async () => {
  const token = await getValueFor('accessToken');

  if (token) {
    return JSON.parse(token).token;
  }

  return null;
};

export const setTokens = async (data: AuthResponse) => {
  await save(StoreKey.accessToken, JSON.stringify(data.accessToken));
  await save(StoreKey.refreshToken, JSON.stringify(data.refreshToken));
};

serverAxios.interceptors.request.use(
  async config => {
    const accessToken = await getToken();
    const configCopy = copy(config);

    if (accessToken) configCopy.headers.Authorization = `Bearer ${accessToken}`;

    return configCopy;
  },
  error => error,
);

export const apis = {
  setHeader: (accessToken: returnToken) => {
    setAuthorizationHeader(accessToken.token);
  },
  getUser: async () => {
    const URL = '/api/v1/users/me';

    return serverAxios
      .get(URL)
      .catch(async err => {
        const error: ErrorType = err?.response?.data;

        if (error.errorCode === 1102) {
          Toast.show({
            type: 'error',
            text1: error.errorDescription,
          });
        }

        if (error.errorCode === 1103) {
          const response = await apis.postRefreshToken();

          return response;
        }

        throw err;
      })
      .then(async response => {
        if (response.data.accessToken && response) {
          await setTokens(response.data);

          return serverAxios.get(URL);
        }

        return response;
      });
  },
  setLogin: async (data: SocialLoginProps) => {
    let tokenDatas: AuthResponse | null = null;
    const res = await serverAxios.post(
      `${SERVER_ADDRESS}${data.url}`,
      data.data,
    );

    if (res.status === 200) {
      tokenDatas = res.data;
      serverAxios.defaults.headers.common.Authorization =
        tokenDatas && `Bearer ${tokenDatas.accessToken.token}`;
    }

    return res;
  },
  createMeeting: async (data: MeetingInfo): Promise<MeetingId> => {
    const URL = '/api/v1/meetings';
    const { meetingName, meetingImageUrl, calendarStartFrom, calendarEndTo } =
      data;
    const meetingData = {
      meetingName,
      meetingImageUrl,
      calendarStartFrom,
      calendarEndTo,
    };
    const { data: datas } = await serverAxios.post<MeetingId>(URL, meetingData);

    return datas;
  },

  postRefreshToken: async () => {
    const URL = '/api/v1/auth/reissue';
    const refreshTokens = await getValueFor(StoreKey.refreshToken);
    const refreshToken = refreshTokens && JSON.parse(refreshTokens);
    const res = await serverAxios.post(URL, {
      refreshToken: refreshToken.token,
      reissueRefreshTokenAlways: true,
    });

    return res;
  },
};

export default apis;
