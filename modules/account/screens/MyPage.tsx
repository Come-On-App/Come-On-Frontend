import React from 'react';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';
import UserAvatar from '@account/components/userAvatar/UserAvatar';
import Email from '@account/components/description/Email';
import WelcomeMessage from '@account/components/description/WelcomeMessage';
import NickName from '@account/components/nickName/NickName';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import { mockUser } from '@account/mocks/mockUser';
import DividerWrapper from '@post/components/detail/DividerWrapper';
import useStyles from './style';

function MyPage() {
  const { userContainer, msgContainer } = useStyles();

  return (
    <View testID={TestId.account.myPage}>
      <ScreenLayout>
        {/* 사용자 정보 */}
        <View style={userContainer}>
          <UserAvatar path={mockUser.userImage} />
          <View style={msgContainer}>
            <WelcomeMessage userName={mockUser.userName} />
            <Email email={mockUser.email} />
          </View>
        </View>
        <NickName name={mockUser.userName} />
      </ScreenLayout>
      {/* 약관 및 앱 정보 */}
      <DividerWrapper>
        <View />
      </DividerWrapper>
    </View>
  );
}

export default MyPage;
