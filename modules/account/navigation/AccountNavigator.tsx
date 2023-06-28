import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyPage from '@account/screens/MyPage';
import { MyPageParamList } from '@account/navigation/type';

const { Screen, Navigator } = createNativeStackNavigator<MyPageParamList>();

function AccountNavigator() {
  return (
    <Navigator
      initialRouteName="MyPage"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Screen name="MyPage" component={MyPage} />
    </Navigator>
  );
}

export default AccountNavigator;
