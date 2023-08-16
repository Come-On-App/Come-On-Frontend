import React from 'react';

import GoogleLogo from '@account/components/auth/logo/google/Google';
import { LoginButton } from '@shared/components/button/Button';
import useLoadingText from '@account/hooks/useLoadingText';
import useAuthManagement from '@account/hooks/useAuthManagement';
import useStyles from './style';

const BUTTON_TITLE = 'Google 로그인';

export default function Apple() {
  const {
    authState: { isLoading },
  } = useAuthManagement();
  const title = useLoadingText(BUTTON_TITLE, isLoading.google);
  const { button, font } = useStyles();
  const isAnyLoading = isLoading.apple || isLoading.google;

  return (
    <LoginButton
      disabled={isAnyLoading}
      Icon={<GoogleLogo />}
      fontStyle={font}
      buttonStyle={button}
      title={title}
      onPress={() => null}
    />
  );
}
