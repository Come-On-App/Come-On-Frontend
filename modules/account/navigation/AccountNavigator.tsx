import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyPage from '@account/screens/MyPage';
import { Inavigator, MyPageParamList } from '@account/navigation/type';
import PolicyNavigator from './PolicyNavigator';

const { Screen, Navigator } = createNativeStackNavigator<MyPageParamList>();

function AccountNavigator({ children }: Inavigator) {
  return (
    <Navigator
      initialRouteName="MyPage"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      {children}
    </Navigator>
  );
}

export default function Navigation() {
  return (
    <AccountNavigator>
      <Screen name="MyPage" component={MyPage} />
      <Screen name="Policy" component={PolicyNavigator} />
    </AccountNavigator>
  );
}
