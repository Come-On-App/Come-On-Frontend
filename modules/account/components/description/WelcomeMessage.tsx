import React from 'react';

import Font from '@shared/components/font/Font';
import { IwelcomeMessage } from './type';
import useStyles from './style';

export default function WelcomeMessage({ userName }: IwelcomeMessage) {
  const { welcomeFont } = useStyles();
  const message = `환영합니다. ${userName}님!`;

  return (
    <Font bold style={welcomeFont}>
      {message}
    </Font>
  );
}
