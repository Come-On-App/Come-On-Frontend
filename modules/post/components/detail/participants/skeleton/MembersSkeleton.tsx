import { ScrollView, View } from 'react-native';
import React from 'react';

import Avatar from '@shared/components/avatar/Avatar';
import Font from '@shared/components/font/Font';
import useStyles from '../member/style';

const EMPTY_STRING = ' ';

export default function MembersSkeleton() {
  return (
    <ScrollView horizontal>
      <MemberSkeleton />
      <MemberSkeleton />
      <MemberSkeleton />
      <MemberSkeleton />
      <MemberSkeleton />
    </ScrollView>
  );
}

function MemberSkeleton() {
  const { container, font } = useStyles();

  return (
    <View style={container} accessibilityHint="loading">
      <Avatar isLoading />
      <Font style={font}>{EMPTY_STRING}</Font>
    </View>
  );
}
