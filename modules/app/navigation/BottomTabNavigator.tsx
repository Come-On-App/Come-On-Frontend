import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyPageNavigator from '@account/navigation/MyPageNavigator';
import EnterMeeting from '@join/screen/EnterMeeting';
import { Tab, options } from './config';
import { BottomTabParamList } from '../types/navigation';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

/**
 * 첫번째 스크린: 게시물 리스트
 * 두번째 스크린: 모임 입장
 * 세번째 스크린: 마이페이지
 */
function BottomTabNavigator({ initialRouteName }: { initialRouteName?: Tab }) {
  return (
    <Navigator initialRouteName={initialRouteName}>
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
    </Navigator>
  );
}

export default BottomTabNavigator;
