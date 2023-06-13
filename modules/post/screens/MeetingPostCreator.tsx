import { View, Text } from 'react-native';
import React from 'react';
import TestId from '@shared/constants/testIds';

export default function MeetingPostCreator() {
  return (
    <View testID={TestId.post.creator}>
      <Text>MeetingPostCreator</Text>
    </View>
  );
}
