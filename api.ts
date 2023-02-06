import React from 'react';
import axios from 'axios';
import { SERVER_ADDRESS } from '@env';
import Toast from 'react-native-toast-message';

import {
  AuthResponse,
  ErrorType,
  returnToken,
  SocialLoginProps,
} from './types';
import { getValueFor, save } from './utils/secureStore';

const TOKEN = async () => {
  const token = await getValueFor('accessToken');
  let result = null;

  if (token) {
    result = JSON.parse(token);
  }

  return result;
};
const api = axios.create({
  baseURL: SERVER_ADDRESS,
  headers: {},
});

export const apis = {
  setHeader: (accessToken: returnToken) => {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken.token}`;
  },
  getUser: async () => {
    const token = await TOKEN();

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token.token}`;

      return api
        .get('/api/v1/users/me')
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
            api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken.token}`;

            return api.get('/api/v1/users/me');
          }

          return response;
        });
    }

    return null;
  },
  setLogin: async (data: SocialLoginProps) => {
    let tokenDatas: AuthResponse | null = null;

    if (!data.data) return null;

    const res = await api.post(`${data.url}`, data.data);

    if (res) {
      tokenDatas = res.data;

      api.defaults.headers.common.Authorization =
        tokenDatas && `Bearer ${tokenDatas.accessToken.token}`;
    }

    return res;
  },
  postRefreshToken: async () => {
    const refreshTokens = await getValueFor('refreshToken');
    const refreshToken = refreshTokens && (await JSON.parse(refreshTokens));
    const res = await api.post('/api/v1/auth/reissue', {
      refreshToken: refreshToken.token,
    });

    await save('accessToken', JSON.stringify(res.data));

    return res;
  },
};

export default apis;
