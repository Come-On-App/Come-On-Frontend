/* eslint-disable no-param-reassign */
import React from 'react';
import axios from 'axios';
import { SERVER_ADDRESS } from '@env';
import Toast from 'react-native-toast-message';
import {
  AuthResponse,
  ErrorType,
  MeetingInfo,
  returnToken,
  SocialLoginProps,
} from './types';
import { getValueFor, save } from './utils/secureStore';

enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}
type MeetingId = {
  meetingId: number;
};

function setAuthorizationHeader(token: string) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const getToken = async () => {
  const token = await getValueFor('accessToken');

  if (token) {
    return JSON.parse(token).token;
  }

  return null;
};
const api = axios.create({
  baseURL: SERVER_ADDRESS,
  headers: { Authorization: '' },
});

api.interceptors.request.use(
  async config => {
    const accessToken = await getToken();

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  error => error,
);

export const apis = {
  setHeader: (accessToken: returnToken) => {
    setAuthorizationHeader(accessToken.token);
  },
  getUser: async () => {
    const URL = '/api/v1/users/me';
    const token = await getToken();

    if (!token) return null;

    return api
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
      .then(response => {
        if (response.data.accessTokne && response) {
          const newToken = response.data.accessToken.token;

          setAuthorizationHeader(newToken);

          return api.get(URL);
        }

        return response;
      });
  },
  setLogin: async (data: SocialLoginProps) => {
    let tokenDatas: AuthResponse | null = null;
    const res = await api.post(`${SERVER_ADDRESS}${data.url}`, data.data, {
      headers: {
        'Cache-Control': 'no-store',
        Pragma: 'no-store',
        Expires: '0',
      },
    });

    if (res) {
      tokenDatas = res.data;
      api.defaults.headers.common.Authorization =
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
    const { data: datas } = await api.post<MeetingId>(URL, meetingData);

    return datas;
  },

  postRefreshToken: async () => {
    const URL = '/api/v1/auth/reissue';
    const refreshTokens = await getValueFor(StoreKey.refreshToken);
    const refreshToken = refreshTokens && (await JSON.parse(refreshTokens));
    const res = await api.post(URL, {
      refreshToken: refreshToken.token,
    });

    await save(StoreKey.accessToken, JSON.stringify(res.data));

    return res;
  },
};

export default apis;
