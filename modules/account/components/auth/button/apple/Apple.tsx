import React from 'react';

import AppleLogo from '@account/components/auth/logo/apple/Apple';
import { LoginButton } from '@shared/components/button/Button';
import useStyles from './style';

const BUTTON_TITLE = 'Apple 로그인';

export default function Apple() {
  const { button, font } = useStyles();

  return (
    <LoginButton
      Icon={<AppleLogo />}
      fontStyle={font}
      buttonStyle={button}
      title={BUTTON_TITLE}
      onPress={() => null}
    />
  );
}
