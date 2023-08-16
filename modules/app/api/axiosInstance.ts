import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { asyncWave } from 'async-wave';

import { UserToken } from '@account/features/auth/type';
import {
  getUserTokenFromStore,
  setUserTokenToStore,
} from '@shared/utils/secureStore';
import store from '@app/redux/store';
import { init } from '@account/features/auth/authSlice';
import { serverAPIConfig } from './config';
import { requestPostReissueToken } from './v1';
import { checkIfAccessTokenExpired } from './utils';

export const serverAPI = axios.create(serverAPIConfig);

(function useInterceptor(axiosInstance: AxiosInstance) {
  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 한다.
      return response;
    },
    async (error: AxiosError) => {
      if (error.response && checkIfAccessTokenExpired(error)) {
        const newRequestConfig = await handleTokenReissue(
          error.response.config,
        );

        if (newRequestConfig) {
          // 기존 API 요청
          return axiosInstance(newRequestConfig);
        }
      }

      return Promise.reject(error);
    },
  );
})(serverAPI);

/**
 * [axios] HTTP 클라이언트의 전역 Authorization 헤더를 구성한다.
 *
 * @param userToken 사용자 토큰정보
 */
export function setDefaultsHeaderAuth(userToken: UserToken) {
  serverAPI.defaults.headers.common.Authorization = `Bearer ${userToken.accessToken.token}`;
}

/**
 * 디바이스 토큰 정보를 사용하여 토큰 재발급 요청을 수행하고, 전역 헤더를 다시 구성한다.
 *
 * @returns 새로운 axios 요청 구성 객체를 반환한다.
 */
function handleTokenReissue(
  prevRequest: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig | void> {
  const REMOVE_TOKEN_FROM_STORE = true;

  return asyncWave(
    [getUserTokenFromStore, requestPostReissueToken, handleUserTokenUpdate],
    {
      onSuccess: (payload: UserToken) => {
        const newRequestConfig = {
          ...prevRequest,
          headers: { Authorization: payload.accessToken.token },
        };

        return newRequestConfig;
      },
      onError: () => {
        store.dispatch(init(REMOVE_TOKEN_FROM_STORE));
      },
    },
  );
}

/**
 * 디바이스에 토큰 정보를 저장하고 전역 헤더를 다시 구성한다.
 */
export function handleUserTokenUpdate(payload: UserToken) {
  [setUserTokenToStore, setDefaultsHeaderAuth].forEach((fn) => fn(payload));

  return payload;
}
