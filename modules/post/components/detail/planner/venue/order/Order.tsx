import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import TestId from '@shared/constants/testIds';
import useStyles from './style';

export default function Order({ order }: { order: number }) {
  const { container, font } = useStyles();

  return (
    <View style={container} testID={TestId.post.order}>
      <Font style={font}>{order}</Font>
    </View>
  );
}
