import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';
import { CategoryType } from './type';

export default function Category({ type }: { type: CategoryType }) {
  const { container, font } = useStyles();

  return (
    <View style={container}>
      <Font style={font}>{type}</Font>
    </View>
  );
}
