import React from 'react';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';
import UserAvatar from '@account/components/userAvatar/UserAvatar';
import Email from '@account/components/description/Email';
import WelcomeMessage from '@account/components/description/WelcomeMessage';
import NickName from '@account/components/nickName/NickName';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import { mockUser } from '@account/mocks/mockUser';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import PolicyVersionList from '@account/components/policyVersionList/PolicyVersionList';
import AccountManagement from '@account/components/accountManagement/AccountManagement';
import useStyles from './style';

function MyPage() {
  const { userContainer, msgContainer, cAccountManagement } = useStyles();

  return (
    <>
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
        <View>
          <DividerWrapper>
            <PolicyVersionList />
          </DividerWrapper>
        </View>
      </View>
      {/* 로그아웃 및 회원탈퇴  */}
      <View style={cAccountManagement}>
        <AccountManagement />
      </View>
    </>
  );
}

export default MyPage;
