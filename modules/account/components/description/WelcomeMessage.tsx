import React from 'react';

import Font from '@shared/components/font/Font';
import useLoadingText from '@account/hooks/useLoadingText';
import { IwelcomeMessage } from './type';
import useStyles from './style';

const LOADING_TITLE = '사용자 정보 불러오는';

export default function WelcomeMessage({
  userName,
  isLoading,
}: IwelcomeMessage) {
  const { welcomeFont } = useStyles();
  const message = `어서오세요. ${userName}님!`;
  const loadingText = useLoadingText(LOADING_TITLE, isLoading);

  if (isLoading) {
    return (
      <Font bold style={welcomeFont}>
        {loadingText}
      </Font>
    );
  }

  return (
    <Font bold style={welcomeFont}>
      {message}
    </Font>
  );
}
