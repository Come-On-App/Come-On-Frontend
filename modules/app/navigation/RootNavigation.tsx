import React, { useRef } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';

import SignIn from '@account/screens/SignIn';
import useAuthManagement from '@account/hooks/useAuthManagement';
import PostDetailNavigator from '@post/navigation/PostDetailNavigator';
import { RootStackParamList } from './type';
import BottomTabNavigator from './BottomTabNavigator';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { authState } = useAuthManagement();

  return (
    <Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      {authState.isLogin ? (
        <>
          <Screen name="Home" component={BottomTabNavigator} />
          {/* Hiding tab bar in specific screens */}
          <Screen
            name="MeetingPostDetail"
            component={PostDetailNavigator}
            options={{
              animation: 'fade',
            }}
          />
        </>
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
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
