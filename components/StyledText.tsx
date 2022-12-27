import React from 'react';
import { Text } from '@rneui/themed';

import { TextProps } from '../types';

function Font({ style, children }: TextProps) {
  return <Text style={[style, { fontFamily: 'pretendard' }]}>{children}</Text>;
}

export default Font;
