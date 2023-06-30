import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';

const DESCRIPTION = '공유 받은 입장 코드를 입력해 주세요';

export default function Description() {
  const { container, font } = useStyles();

  return (
    <View style={container}>
      <Font style={font}>{DESCRIPTION}</Font>
    </View>
  );
}
