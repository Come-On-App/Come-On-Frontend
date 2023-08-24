import { View } from 'react-native';
import React, { useEffect } from 'react';

import UserAvatar from '@account/components/userAvatar/UserAvatar';
import Email from '@account/components/description/Email';
import WelcomeMessage from '@account/components/description/WelcomeMessage';
import NickName from '@account/components/nickName/NickName';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import useMyInfoQuery from '@account/hooks/useMyInfoQuery';

import useUserManagement from '@account/hooks/useUserManagement';
import { invert } from '@shared/utils';

import useStyles from './style';

/**
 * 사용자의 프로필 이미지, 닉네임 등 사용자 정보를 표시한다.
 */
export default function UserInfo() {
  const { userContainer, msgContainer } = useStyles();
  const { isSuccess } = useMyInfoQuery();
  const { dispatchLoadingStatus } = useUserManagement();

  useEffect(() => {
    dispatchLoadingStatus(invert(isSuccess));
  }, [dispatchLoadingStatus, isSuccess]);

  return (
    <ScreenLayout>
      <View style={userContainer}>
        <UserAvatar />
        <View style={msgContainer}>
          <WelcomeMessage />
          <Email />
        </View>
      </View>
      <NickName />
    </ScreenLayout>
  );
}
