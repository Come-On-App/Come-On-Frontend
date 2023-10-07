import React from 'react';
import {
  AppleAuthenticationCredential,
  AppleAuthenticationFullName,
  AppleAuthenticationScope,
  signInAsync,
} from 'expo-apple-authentication';
import { asyncWave } from 'async-wave';

import {
  PostAppleAuthPayload,
  PostAppleAuthResponse,
} from '@account/api/v1/type';
import AppleLogo from '@account/components/auth/logo/apple/Apple';
import { LoginButton } from '@shared/components/button/Button';
import useLoadingText from '@account/hooks/useLoadingText';
import useAuthManagement from '@account/hooks/useAuthManagement';
import { requestPostAppleAuth } from '@account/api/v1';
import { handleUserTokenUpdate } from '@app/api/axiosInstance';
import useStyles from './style';
import { AppleErrorCode } from './type';

const BUTTON_TITLE = 'Apple 로그인';
const ERROR_REASON_UNSUPPORTED = 'Apple 로그인은 iOS에서만 지원하고 있습니다.';

export default function Apple() {
  const {
    authState: { isLoading, isError },
    dispatchAppleStatus,
    dispatchErrorStatus,
    dispatchErrorReason,
    dispatchUserLoginStatus,
  } = useAuthManagement();
  const { button, font } = useStyles();
  const buttonTitle = useLoadingText(BUTTON_TITLE, isLoading.apple);

  return (
    <LoginButton
      disabled={isLoading.apple || isLoading.google}
      Icon={<AppleLogo />}
      fontStyle={font}
      buttonStyle={button}
      title={buttonTitle}
      onPress={() =>
        asyncWave(
          [
            isError && dispatchErrorStatus(false),
            isError && dispatchErrorReason(null),
            dispatchAppleStatus(true),
            requestAppleAuthentication,
            createAppleAuthPayload,
            requestPostAppleAuth,
          ],
          {
            onSuccess: (payload: PostAppleAuthResponse) => {
              handleUserTokenUpdate(payload);
              dispatchUserLoginStatus(true);
            },
            onError: (error: AppleErrorCode) => {
              if (checkUnavailableError(error)) {
                dispatchErrorStatus(true);
                dispatchErrorReason(ERROR_REASON_UNSUPPORTED);

                return;
              }

              if (ignoreRequestCanceled(error)) {
                dispatchErrorStatus(true);

                throw error;
              }
            },
            onSettled: () => dispatchAppleStatus(false),
          },
        )
      }
    />
  );
}

/**
 * [헬퍼 함수]
 * 서버에 요청할 올바른 페이로드 객체를 반환한다.
 */
const createAppleAuthPayload = (
  credential: AppleAuthenticationCredential,
): PostAppleAuthPayload => {
  if (!credential.identityToken) {
    throw new Error('identityToken does not exist');
  }

  function createName(fullName: AppleAuthenticationFullName | null) {
    const isEmptyName = fullName?.familyName || fullName?.givenName;

    if (!isEmptyName) return null;

    return `${fullName.familyName}${fullName.givenName}`;
  }

  return {
    identityToken: credential.identityToken,
    user: credential.user,
    email: credential.email,
    name: createName(credential.fullName),
  };
};
/**
 * [헬퍼 함수]
 * Apple 로그인 API 요청 함수
 */
const requestAppleAuthentication = async () => {
  return signInAsync({
    requestedScopes: [
      AppleAuthenticationScope.FULL_NAME,
      AppleAuthenticationScope.EMAIL,
    ],
  });
};
const ignoreRequestCanceled = (error: AppleErrorCode) => {
  return error?.code !== 'ERR_REQUEST_CANCELED';
};
const checkUnavailableError = (error: AppleErrorCode) => {
  return error?.code === 'ERR_UNAVAILABLE';
};
