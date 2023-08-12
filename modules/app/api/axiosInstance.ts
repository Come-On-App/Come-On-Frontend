import axios, { AxiosRequestConfig } from 'axios';

import { UserToken } from '@account/features/auth/type';

export const BASE_URL = process.env.SERVER_API_URL ?? 'http://localhost';

const serverAPIConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

export const serverAPI = axios.create(serverAPIConfig);

/**
 * [Axios] HTTP 클라이언트의 전역 Authorization 구성 함수
 *
 * @param userToken 사용자 토큰정보
 */
export function setAuthToken(userToken: UserToken) {
  serverAPI.defaults.headers.common.Authorization = `Bearer ${userToken.accessToken.token}`;
}
