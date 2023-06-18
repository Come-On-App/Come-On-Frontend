import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MeetingPostListParamList } from '@post/navigation/type';
import MeetingDashboard from '@post/screens/MeetingDashboard';
import MeetingPostCreator from '@post/screens/MeetingPostCreator';

const { Screen, Navigator } =
  createNativeStackNavigator<MeetingPostListParamList>();

export function PostNavigator({ children }: { children: React.ReactNode }) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      {children}
    </Navigator>
  );
}

export default function Navigation() {
  return (
    <PostNavigator>
      <Screen name="MeetingPostList" component={MeetingDashboard} />
      <Screen name="MeetingPostCreation" component={MeetingPostCreator} />
    </PostNavigator>
  );
}
