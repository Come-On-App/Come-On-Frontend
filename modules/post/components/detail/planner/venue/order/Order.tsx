import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';

export default function Order({ order }: { order: number }) {
  const { container, font } = useStyles();

  return (
    <View style={container}>
      <Font style={font}>{order}</Font>
    </View>
  );
}
