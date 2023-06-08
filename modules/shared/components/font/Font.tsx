import React from 'react';
import { Text } from '@rneui/themed';

import { FontProps } from './type';
import useStyle from './style';

export default function Font({ style, children, bold }: FontProps) {
  const { defaultStyle } = useStyle();
  const fontFamily = bold ? 'pretendard-bold' : 'pretendard-regular';

  return <Text style={[defaultStyle, style, { fontFamily }]}>{children}</Text>;
}
