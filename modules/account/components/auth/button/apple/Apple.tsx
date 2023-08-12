import React from 'react';
import {
  AppleAuthenticationCredential,
  AppleAuthenticationFullName,
  AppleAuthenticationScope,
  signInAsync,
} from 'expo-apple-authentication';
import _ from 'lodash';
import { goAsync } from 'promise-vigilant';

import {
  PostAppleAuthPayload,
  PostAppleAuthResponse,
} from '@account/api/v1/type';
import AppleLogo from '@account/components/auth/logo/apple/Apple';
import { LoginButton } from '@shared/components/button/Button';
import useLoadingText from '@account/hooks/useLoadingText';
import useAuthManagement from '@account/hooks/useAuthManagement';
import { requestPostAppleAuth } from '@account/api/v1';
import useStyles from './style';
import { AppleErrorCode } from './type';

const BUTTON_TITLE = 'Apple 로그인';

export default function Apple() {
  const {
    authState: { isLoading, isError },
    dispatchAppleStatus,
    dispatchErrorStatus,
    dispatchUserToken,
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
        goAsync(
          [
            isError && dispatchErrorStatus(false),
            dispatchAppleStatus(true),
            requestAppleAuthentication,
            createAppleAuthPayload,
            requestPostAppleAuth,
          ],
          {
            onSuccess: (payload: PostAppleAuthResponse) => {
              dispatchUserToken(payload);
            },
            onError: (error: AppleErrorCode) => {
              if (error.code !== 'ERR_REQUEST_CANCELED') {
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

  function createName(fullName: AppleAuthenticationFullName) {
    return `${fullName.familyName}${fullName.givenName}`;
  }

  return {
    identityToken: credential.identityToken,
    user: credential.user,
    email: credential.email,
    name: _.isNull(credential.fullName)
      ? undefined
      : createName(credential.fullName),
  };
};
const requestAppleAuthentication = () => {
  return signInAsync({
    requestedScopes: [
      AppleAuthenticationScope.FULL_NAME,
      AppleAuthenticationScope.EMAIL,
    ],
  });
};
