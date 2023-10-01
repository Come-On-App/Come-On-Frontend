import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TestId from '@shared/constants/testIds';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import PolicyVersionMenu from '@account/components/policyVersionMenu/PolicyVersionMenu';
import AccountManagement from '@account/components/accountManagement/AccountManagement';
import UserInfo from '@account/components/userInfo/UserInfo';
import KeyboardDismissView from '@shared/components/keyboard/KeyboardDismissView';
import useStyles from './style';

function MyPage() {
  const { cAccountManagement } = useStyles();

  return (
    <SafeAreaView>
      <KeyboardDismissView>
        <View testID={TestId.account.myPage}>
          <UserInfo />
          {/* 약관 및 앱 정보 */}
          <DividerWrapper>
            <PolicyVersionMenu />
          </DividerWrapper>
        </View>
        {/* 로그아웃 및 회원탈퇴  */}
        <View style={cAccountManagement}>
          <AccountManagement />
        </View>
      </KeyboardDismissView>
    </SafeAreaView>
  );
}

export default MyPage;
