import React from 'react';
import { Text } from '@rneui/themed';

import { FontProps } from './type';
import useStyle from './style';

export default function Font({ style, children }: FontProps) {
  const { defaultStyle } = useStyle();

  return (
    <Text style={[defaultStyle, style, { fontFamily: 'pretendard-regular' }]}>
      {children}
    </Text>
  );
}
