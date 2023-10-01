import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  IPostNavigation,
  IPostNavigator,
  PostRouteNames,
  PostStackParamList,
} from '@post/navigation/type';
import MeetingDashboard from '@post/screens/MeetingDashboard';
import MeetingPostCreator from '@post/screens/MeetingPostCreator';
import MeetingDatePicker from '@post/screens/MeetingDatePicker';
import MeetingPostModifier from '@post/screens/MeetingPostModifier';
import MeetingPostReportForm from '@post/screens/MeetingPostReportForm';

import useTabBarVisibility from '@post/hooks/useTabBarVisibility';
import PostDetailNavigator from './PostDetailNavigator';

const { Screen, Navigator } = createNativeStackNavigator<PostStackParamList>();

function PostNavigator({ children, initialRouteName }: IPostNavigator) {
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

export default function Navigation({
  initialRouteName,
  ONLY_TEST_ID,
  navigation,
  route,
}: IPostNavigation) {
  useTabBarVisibility<PostRouteNames>(
    { navigation, route },
    'MeetingPostDetail',
  );

  return (
    <PostNavigator initialRouteName={initialRouteName}>
      <Screen name="MeetingPostList" component={MeetingDashboard} />
      <Screen name="MeetingPostCreation" component={MeetingPostCreator} />
      <Screen
        name="MeetingPostModification"
        component={MeetingPostModifier}
        initialParams={{ id: ONLY_TEST_ID }}
      />
      <Screen name="MeetingPostReport" component={MeetingPostReportForm} />
      <Screen
        name="MeetingDateSelector"
        component={MeetingDatePicker}
        options={{ presentation: 'modal' }}
      />
      <Screen name="MeetingPostDetail" component={PostDetailNavigator} />
    </PostNavigator>
  );
}
