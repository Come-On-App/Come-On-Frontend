import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyPageNavigator from '@account/navigation/MyPageNavigator';
import { RootTabParamList } from '../types/navigation';

const { Navigator, Screen } = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <Navigator initialRouteName="TabThree">
      <Screen name="TabThree" component={MyPageNavigator} />
    </Navigator>
  );
}

export default BottomTabNavigator;
