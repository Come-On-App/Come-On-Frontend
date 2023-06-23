import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyPageNavigator from '@account/navigation/AccountNavigator';
import MeetingCode from '@connection/screen/MeetingCode';
import PostNavigator from '@post/navigation/PostNavigator';
import { Tab, options } from './config';
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
      }}
    >
      {children}
    </Navigator>
  );
}

export default function Navigation({ initialRouteName }: Inavigation) {
  return (
    <BottomTabNavigator initialRouteName={initialRouteName}>
      <Screen
        name={Tab.one}
        component={PostNavigator}
        options={options[Tab.one]}
      />
      <Screen
        name={Tab.two}
        component={MeetingCode}
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
