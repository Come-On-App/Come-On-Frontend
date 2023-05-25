import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyPage from '@account/screens/MyPage';

const { Screen, Navigator } = createNativeStackNavigator();

function MyPageNavigator() {
  return (
    <Navigator initialRouteName="MyPage">
      <Screen name="MyPage" component={MyPage} />
    </Navigator>
  );
}

export default MyPageNavigator;
