import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyPage from '@account/screens/MyPage';
import { MyPageParamList } from '@account/types/navigation';

const { Screen, Navigator } = createNativeStackNavigator<MyPageParamList>();

function AccountNavigator() {
  return (
    <Navigator initialRouteName="MyPage">
      <Screen name="MyPage" component={MyPage} />
    </Navigator>
  );
}

export default AccountNavigator;
