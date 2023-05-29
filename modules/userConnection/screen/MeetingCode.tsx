import TestId from '@shared/constants/testIds';
import React from 'react';
import { Text, View } from 'react-native';

function MeetingCode() {
  return (
    <View testID={TestId.userConnection.code}>
      <Text>MeetingCode</Text>
    </View>
  );
}

export default MeetingCode;
