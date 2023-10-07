import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { asyncWave } from 'async-wave';

import GoogleLogo from '@account/components/auth/logo/google/Google';
import { LoginButton } from '@shared/components/button/Button';
import useLoadingText from '@account/hooks/useLoadingText';
import useAuthManagement from '@account/hooks/useAuthManagement';
import { requestPostGoogleAuth } from '@account/api/v1';
import { PostGoogleAuthResponse } from '@account/api/v1/type';
import { handleUserTokenUpdate } from '@app/api/axiosInstance';
import useStyles from './style';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

const BUTTON_TITLE = 'Google 로그인';

export default function Google() {
  const {
    authState: { isLoading, isError },
    dispatchGoogleStatus,
    dispatchErrorStatus,
    dispatchErrorReason,
    dispatchUserLoginStatus,
  } = useAuthManagement();
  const { button, font } = useStyles();
  const buttonTitle = useLoadingText(BUTTON_TITLE, isLoading.google);

  return (
    <LoginButton
      disabled={isLoading.apple || isLoading.google}
      Icon={<GoogleLogo />}
      fontStyle={font}
      buttonStyle={button}
      title={buttonTitle}
      onPress={() =>
        asyncWave(
          [
            isError && dispatchErrorStatus(false),
            isError && dispatchErrorReason(null),
            dispatchGoogleStatus(true),
            requestGoogleAuthentication,
            requestPostGoogleAuth,
          ],
          {
            onSuccess: (payload: PostGoogleAuthResponse) => {
              handleUserTokenUpdate(payload);
              dispatchUserLoginStatus(true);
            },
            onError: (error) => {
              if (ignoreRequestCanceled(error)) {
                dispatchErrorStatus(true);

                throw error;
              }
            },
            onSettled: () => dispatchGoogleStatus(false),
          },
        )
      }
    />
  );
}
/**
 * [헬퍼 함수]
 * Google 로그인 API 요청 함수
 */
const requestGoogleAuthentication = async () => {
  await GoogleSignin.hasPlayServices();

  const { idToken } = await GoogleSignin.signIn();

  return { idToken };
};
const ignoreRequestCanceled = (error: { code: unknown }) => {
  return error?.code !== statusCodes.SIGN_IN_CANCELLED;
};
