import { View, Text } from 'react-native';
import React from 'react';
import TestId from '@shared/constants/testIds';

export default function MeetingPostViewer() {
  return (
    <View testID={TestId.post.detail}>
      <Text>MeetingPostViewer</Text>
    </View>
  );
}
