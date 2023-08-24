import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '@account/screens/SignIn';
import useAuthManagement from '@account/hooks/useAuthManagement';

import { RootStackParamList } from './type';
import BottomTabNavigator from './BottomTabNavigator';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { authState } = useAuthManagement();

  return (
    <Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      {authState.isLogin ? (
        <Screen name="Home" component={BottomTabNavigator} />
      ) : (
        <Screen
          name="SignIn"
          component={SignIn}
          options={{
            animationTypeForReplace: authState.isLogin ? 'push' : 'pop',
          }}
        />
      )}
    </Navigator>
  );
}

/**
 * 최초 진입점
 *
 * 로그인 상태에 따라 네비게이터를 분기를 시킨다.
 */
export default function RootNavigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
