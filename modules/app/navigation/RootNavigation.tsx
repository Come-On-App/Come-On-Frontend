import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '@account/screens/SignIn';
import useAuthManagement from '@account/hooks/useAuthManagement';
import BottomTabNavigator from './BottomTabNavigator';
import { RootStackParamList } from './type';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { authState } = useAuthManagement();
  const isUserTokenNull = authState.userToken === null;

  return (
    <Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      {isUserTokenNull ? (
        <Screen
          name="SignIn"
          component={SignIn}
          options={{
            animationTypeForReplace: isUserTokenNull ? 'pop' : 'push',
          }}
        />
      ) : (
        <Screen name="Home" component={BottomTabNavigator} />
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
