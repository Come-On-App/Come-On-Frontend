import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';
import { ItextLengthCounter } from './type';

function formatLength(length: number, max: number) {
  return length <= max ? `${length}/${max}` : `${max}/${max}`;
}

export default function TextLengthCounter({
  text: { length },
  max,
}: ItextLengthCounter) {
  const { font } = useStyles();

  return (
    <View>
      <Font style={font}>{formatLength(length, max)}</Font>
    </View>
  );
}
