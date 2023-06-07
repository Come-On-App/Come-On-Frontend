import TestId from '@shared/constants/testIds';
import React from 'react';
import { Text, View } from 'react-native';

function MeetingCode() {
  return (
    <View testID={TestId.connection.code}>
      <Text>MeetingCode</Text>
    </View>
  );
}

export default MeetingCode;
