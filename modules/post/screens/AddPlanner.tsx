import { View, Text } from 'react-native';
import React from 'react';
import { PostNativeStack } from '@post/navigation/type';

export default function AddPlanner({
  route: { params },
}: PostNativeStack<'MeetingPlanner'>) {
  return (
    <View>
      <Text>AddPlanner</Text>
    </View>
  );
}
