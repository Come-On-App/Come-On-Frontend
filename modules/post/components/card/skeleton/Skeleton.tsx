import React from 'react';
import { View } from 'react-native';
import { Skeleton as RNSkeleton } from '@rneui/themed';

import TestId from '@shared/constants/testIds';
import useStyles from './style';

export default function Skeleton() {
  const {
    cCard,
    thumbnail,
    title,
    subTitle,
    subTitleDateWidth,
    subTitleNickNameWidth,
  } = useStyles();

  return (
    <View testID={TestId.post.skeleton} style={cCard}>
      <RNSkeleton style={thumbnail} />
      <RNSkeleton style={title} />
      <View style={{ flexDirection: 'row' }}>
        <RNSkeleton style={[subTitle, subTitleNickNameWidth]} />
        <RNSkeleton style={[subTitle, subTitleDateWidth]} />
      </View>
    </View>
  );
}
