import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MeetingPostListParamList } from '@post/navigation/type';
import MeetingPostList from '@post/screens/MeetingPostList';

const { Screen, Navigator } =
  createNativeStackNavigator<MeetingPostListParamList>();

function PostNavigator() {
  return (
    <Navigator initialRouteName="MeetingPostList">
      <Screen name="MeetingPostList" component={MeetingPostList} />
    </Navigator>
  );
}

export default PostNavigator;
