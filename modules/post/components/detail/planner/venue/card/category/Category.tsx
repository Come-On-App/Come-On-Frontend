import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import { CategoryLabel } from '@post/api/v2/type';
import useStyles from './style';

export default function Category({ type }: { type: CategoryLabel }) {
  const { container, font } = useStyles();

  return (
    <View style={container}>
      <Font style={font}>{type}</Font>
    </View>
  );
}
