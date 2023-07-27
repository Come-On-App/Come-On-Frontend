import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Inavigation,
  IpostNavigator,
  MeetingPostListParamList,
} from '@post/navigation/type';
import MeetingDashboard from '@post/screens/MeetingDashboard';
import MeetingPostCreator from '@post/screens/MeetingPostCreator';
import MeetingDatePicker from '@post/screens/MeetingDatePicker';
import MeetingPostViewer from '@post/screens/MeetingPostViewer';
import MeetingPostModifier from '@post/screens/MeetingPostModifier';

const { Screen, Navigator } =
  createNativeStackNavigator<MeetingPostListParamList>();

function PostNavigator({ children, initialRouteName }: IpostNavigator) {
  return (
    <Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      {children}
    </Navigator>
  );
}

export default function Navigation({ initialRouteName }: Inavigation) {
  return (
    <PostNavigator initialRouteName={initialRouteName}>
      <Screen name="MeetingPostList" component={MeetingDashboard} />
      <Screen name="MeetingPostCreation" component={MeetingPostCreator} />
      <Screen name="MeetingPostModification" component={MeetingPostModifier} />
      <Screen
        name="MeetingDateSelector"
        component={MeetingDatePicker}
        options={{ presentation: 'modal' }}
      />
      <Screen name="MeetingPostDetail" component={MeetingPostViewer} />
    </PostNavigator>
  );
}
