import React from 'react';
import { View } from 'react-native';

import Font from '@shared/components/font/Font';
import useStyles from './style';
import IDescription from './type';

export default function Description({
  description,
  position = 'marginBottom',
  fontStyle,
}: IDescription) {
  const { container, font } = useStyles();

  return (
    <View style={[{ [position]: container[position] }]}>
      <Font style={[font, fontStyle]}>{description}</Font>
    </View>
  );
}
