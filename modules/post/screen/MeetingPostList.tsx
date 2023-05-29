import TestId from '@shared/constants/testIds';
import React from 'react';
import { Text, View } from 'react-native';

function MeetingPostList() {
  return (
    <View testID={TestId.post.list}>
      <Text>MeetingPostList</Text>
    </View>
  );
}

export default MeetingPostList;
