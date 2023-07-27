import { Text, ScrollView } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import { MeetingPostListParamList } from '@post/navigation/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function MeetingPostModifier({
  route,
}: NativeStackScreenProps<
  MeetingPostListParamList,
  'MeetingPostModification'
>) {
  return (
    <ScrollView testID={TestId.post.modifier} bounces={false}>
      <Text>MeetingPostModifier</Text>
    </ScrollView>
  );
}
