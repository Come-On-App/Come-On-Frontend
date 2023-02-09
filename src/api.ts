/* eslint-disable no-param-reassign */
import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_ADDRESS } from '@env';
import Toast from 'react-native-toast-message';
import { ErrorType, MeetingInfo, returnToken, SocialLoginProps } from './types';
import { getValueFor, save } from './utils/secureStore';

enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}

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
    if (!data.data) return null;

    const res = await api.post(`${data.url}`, data.data);
    const tokenDatas = res.data;
    const accessToken = tokenDatas.accessToken.token;

    setAuthorizationHeader(accessToken);

    return res;
  },

  createMeeting: async (data: MeetingInfo) => {
    const URL = '/api/v1/meetings';
    const { meetingName, meetingImageUrl, calendarStartFrom, calendarEndTo } =
      data;
    const meetingData = {
      meetingName,
      meetingImageUrl,
      calendarStartFrom,
      calendarEndTo,
    };

    api
      .post(URL, meetingData)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
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
