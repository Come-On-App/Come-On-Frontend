import { View } from 'react-native';
import React from 'react';

import Logo from '@shared/components/logo/Logo';
import AppleLoginButton from '@account/components/auth/apple/Apple';
import GoogleLoginButton from '@account/components/auth/google/Google';
import Font from '@shared/components/font/Font';
import useAuthManagement from '@account/hooks/useAuthManagement';
import TestId from '@shared/constants/testIds';
import useStyles from './style';

const LOGIN_LODING = '로그인 중입니다. 잠시만 기다려 주세요.';
const LOGIN_TITLE = '소셜 로그인';
const LOGIN_ERROR = '로그인에 실패했습니다. 다시 시도해 주세요.';

export default function SignIn() {
  const {
    signInContainerLogo,
    signInContent,
    signInContainer,
    loginTitle,
    loginError,
  } = useStyles();
  const {
    authState: { isLoading, isError, error },
  } = useAuthManagement();
  const isAnyLoading = isLoading.apple || isLoading.google;
  let SignInMessage = (
    <Font style={loginTitle} bold>
      {isAnyLoading ? LOGIN_LODING : LOGIN_TITLE}
    </Font>
  );

  if (isError) {
    const LOGIN_ERROR_REASON = error.reason;

    SignInMessage = (
      <Font style={loginError} bold>
        {LOGIN_ERROR_REASON || LOGIN_ERROR}
      </Font>
    );
  }

  return (
    <View style={signInContainer} testID={TestId.account.signin}>
      <View style={signInContainerLogo}>
        <Logo />
      </View>
      <View style={[signInContent]}>
        {SignInMessage}
        <AppleLoginButton />
        <GoogleLoginButton />
      </View>
    </View>
  );
}
