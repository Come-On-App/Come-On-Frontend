/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { View } from 'react-native';

import Font from '@shared/components/font/Font';
import useAuthManagement from '@account/hooks/useAuthManagement';
import useStyles from './style';

const LEFT_BUTTON_TITLE = '로그아웃';
const RIGHT_BUTTON_TITLE = '회원탈퇴';

export default function AccountManagement() {
  const { container, font } = useStyles();
  const { initPostState } = useAuthManagement();
  const onLogout = () => {
    initPostState();
  };
  const onAccountDeletion = () => {};

  return (
    <View style={container}>
      <Font onPress={onLogout} style={font}>
        {LEFT_BUTTON_TITLE}
      </Font>
      <Font style={[font, { paddingHorizontal: 5 }]}>|</Font>
      <Font onPress={onAccountDeletion} style={font}>
        {RIGHT_BUTTON_TITLE}
      </Font>
    </View>
  );
}
