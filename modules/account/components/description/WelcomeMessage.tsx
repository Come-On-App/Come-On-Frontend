import React from 'react';

import Font from '@shared/components/font/Font';
import useLoadingText from '@account/hooks/useLoadingText';
import useUserManagement from '@account/hooks/useUserManagement';
import { EMPTY_STRING } from '@shared/utils';
import { useQueryDataByUser } from '@account/hooks/useMyInfoQuery';
import useStyles from './style';

const LOADING_TITLE = '사용자 정보 불러오는';

export default function WelcomeMessage() {
  const message = useGetMessage();
  const { welcomeFont } = useStyles();
  const { userState } = useUserManagement();
  const loadingText = useLoadingText(LOADING_TITLE, userState.isLoading);

  if (userState.isLoading) {
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

function useGetMessage() {
  const userQueryData = useQueryDataByUser();

  return userQueryData?.name || EMPTY_STRING;
}
