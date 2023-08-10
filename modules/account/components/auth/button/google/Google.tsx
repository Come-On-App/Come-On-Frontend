import React from 'react';

import GoogleLogo from '@account/components/auth/logo/google/Google';
import { LoginButton } from '@shared/components/button/Button';
import useStyles from './style';

const BUTTON_TITLE = 'Google 로그인';

export default function Apple() {
  const { button, font } = useStyles();

  return (
    <LoginButton
      Icon={<GoogleLogo />}
      fontStyle={font}
      buttonStyle={button}
      title={BUTTON_TITLE}
      onPress={() => null}
    />
  );
}
