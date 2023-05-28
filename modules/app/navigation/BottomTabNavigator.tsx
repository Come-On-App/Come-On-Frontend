import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyPageNavigator from '@account/navigation/MyPageNavigator';
import { Tab, options } from './config';
import { BottomTabParamList } from '../types/navigation';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <Navigator initialRouteName={Tab.three}>
      <Screen
        name={Tab.three}
        component={MyPageNavigator}
        options={options[Tab.three]}
      />
    </Navigator>
  );
}

export default BottomTabNavigator;
