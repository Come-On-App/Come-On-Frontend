import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyPageNavigator from '@account/navigation/AccountNavigator';
import EnterMeeting from '@connection/screen/EnterMeeting';
import PostNavigator from '@post/navigation/PostNavigator';
import { Tab, bottomTabStyle, options } from './config';
import { BottomTabParamList, IbottomTabNavigator, Inavigation } from './type';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

/**
 * 첫 번째 스크린: 모임 게시물 리스트
 * 두 번째 스크린: 모임 입장
 * 세 번째 스크린: 마이페이지
 */
function BottomTabNavigator({
  children,
  initialRouteName,
}: IbottomTabNavigator) {
  return (
    <Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: bottomTabStyle,
        tabBarHideOnKeyboard: true,
        freezeOnBlur: true,
      }}
    >
      {children}
    </Navigator>
  );
}

export default function BottomTabNavigation({ initialRouteName }: Inavigation) {
  return (
    <BottomTabNavigator initialRouteName={initialRouteName}>
      <Screen
        name={Tab.one}
        component={PostNavigator}
        options={options[Tab.one]}
      />
      <Screen
        name={Tab.two}
        component={EnterMeeting}
        options={options[Tab.two]}
      />
      <Screen
        name={Tab.three}
        component={MyPageNavigator}
        options={options[Tab.three]}
      />
    </BottomTabNavigator>
  );
}
