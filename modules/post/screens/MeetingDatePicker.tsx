import { View, Text } from 'react-native';
import React from 'react';
import TestId from '@shared/constants/testIds';

export default function MeetingDatePicker() {
  return (
    <View testID={TestId.post.dateSelector}>
      <Text>MeetingDatePicker</Text>
    </View>
  );
}
