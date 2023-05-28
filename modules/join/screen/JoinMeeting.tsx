import TestId from '@shared/constants/testIds';
import React from 'react';
import { Text, View } from 'react-native';

function JoinMeeting() {
  return (
    <View testID={TestId.join.Meeting}>
      <Text>JoinMeeting</Text>
    </View>
  );
}

export default JoinMeeting;
