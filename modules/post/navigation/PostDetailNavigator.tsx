import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  IPostDetailNavigation,
  IPostDetailNavigator,
  PostDetailStackParamLis,
} from '@post/navigation/type';
import MeetingPostDetail from '@post/screens/MeetingPostDetail';
import MeetingVote from '@post/screens/MeetingVote';
import MeetingPlanner from '@post/screens/MeetingPlanner';
import MeetingPlannerDetail from '@post/screens/MeetingPlannerDetail';
import MeetingCardDetail from '@post/screens/MeetingCardDetail';

// 게시물 상세 스택
const { Screen, Navigator } =
  createNativeStackNavigator<PostDetailStackParamLis>();

function PostDetailNavigator({
  children,
  initialRouteName = 'PostDetail',
}: IPostDetailNavigator) {
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
}: IPostDetailNavigation) {
  return (
    <PostDetailNavigator initialRouteName={initialRouteName}>
      <Screen name="PostDetail" component={MeetingPostDetail} />
      <Screen name="PostDetailVote" component={MeetingVote} />
      <Screen name="PostDetailPlanner" component={MeetingPlanner} />
      <Screen name="PostDetailPlannerField" component={MeetingPlannerDetail} />
      <Screen
        name="PostDetailMeetingCardDetail"
        component={MeetingCardDetail}
      />
    </PostDetailNavigator>
  );
}
