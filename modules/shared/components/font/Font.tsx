import React from 'react';
import { Text } from '@rneui/themed';

import { Ifont, IscreenFont } from './type';
import useStyle from './style';

export default function Font({ style, children, bold, numberOfLines }: Ifont) {
  const { defaultStyle } = useStyle();
  const fontFamily = bold ? 'pretendard-bold' : 'pretendard-regular';

  return (
    <Text
      style={[defaultStyle, style, { fontFamily }]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

export function ScreenTitle({ children }: IscreenFont) {
  const { screenFont } = useStyle();

  return (
    <Font bold style={screenFont}>
      {children}
    </Font>
  );
}
