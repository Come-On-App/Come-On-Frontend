import React from 'react';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import PolicyVersionList from '@account/components/policyVersionList/PolicyVersionList';
import AccountManagement from '@account/components/accountManagement/AccountManagement';
import UserInfo from '@account/components/userInfo/UserInfo';
import useStyles from './style';

function MyPage() {
  const { cAccountManagement } = useStyles();

  return (
    <>
      <View testID={TestId.account.myPage}>
        <UserInfo />
        {/* 약관 및 앱 정보 */}
        <DividerWrapper>
          <PolicyVersionList />
        </DividerWrapper>
      </View>
      {/* 로그아웃 및 회원탈퇴  */}
      <View style={cAccountManagement}>
        <AccountManagement />
      </View>
    </>
  );
}

export default MyPage;
