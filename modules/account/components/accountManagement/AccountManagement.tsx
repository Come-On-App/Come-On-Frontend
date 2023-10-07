import React, { useState } from 'react';
import { View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Font from '@shared/components/font/Font';
import useAuthManagement from '@account/hooks/useAuthManagement';
import { asyncWave } from 'async-wave';
import { requestDeleteUser, requestPostUserLogout } from '@account/api/v1';
import { useMutation } from '@tanstack/react-query';
import useStyles from './style';
import AccountDeletionModal from './accountDeletionModal/AccountDeletionModal';

const REMOVE_TOKEN_FROM_STORE = true;
const LEFT_BUTTON_TITLE = '로그아웃';
const RIGHT_BUTTON_TITLE = '회원탈퇴';

export default function AccountManagement() {
  const [showModal, setModalStatus] = useState(false);
  const { container, font } = useStyles();
  const { initAuthState } = useAuthManagement();
  const { mutate, isLoading } = useMutation(requestDeleteUser, {
    onSuccess: () => {
      signOutIfGoogleLoggedIn();
    },
    onSettled: () => {
      initAuthState(REMOVE_TOKEN_FROM_STORE);
    },
  });
  const onLogout = () => {
    asyncWave([
      signOutIfGoogleLoggedIn,
      initAuthState(REMOVE_TOKEN_FROM_STORE),
      requestPostUserLogout,
    ]);
  };

  return (
    <View style={container}>
      <Font onPress={onLogout} style={font}>
        {LEFT_BUTTON_TITLE}
      </Font>
      <Font style={[font, { paddingHorizontal: 5 }]}>|</Font>
      <Font onPress={() => setModalStatus(true)} style={font}>
        {RIGHT_BUTTON_TITLE}
      </Font>
      <AccountDeletionModal
        isVisible={showModal}
        onPressLeft={() => setModalStatus(false)}
        onPressRight={mutate}
        isSubmit={isLoading}
      />
    </View>
  );
}

const signOutIfGoogleLoggedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();

  if (isSignedIn) {
    await GoogleSignin.signOut();
  }
};
