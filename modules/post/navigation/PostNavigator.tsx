import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MeetingPostListParamList } from '@post/navigation/type';
import MeetingDashboard from '@post/screens/MeetingDashboard';
import MeetingPostCreator from '@post/screens/MeetingPostCreator';

const { Screen, Navigator } =
  createNativeStackNavigator<MeetingPostListParamList>();

function PostNavigator() {
  return (
    <Navigator
      initialRouteName="MeetingPostList"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Screen name="MeetingPostList" component={MeetingDashboard} />
      <Screen name="MeetingPostCreation" component={MeetingPostCreator} />
    </Navigator>
  );
}

export default PostNavigator;
