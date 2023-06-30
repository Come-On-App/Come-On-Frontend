import React from 'react';
import { Text } from '@rneui/themed';

import { Ifont, IscreenFont } from './type';
import useStyle from './style';

export default function Font({
  style,
  children,
  bold,
  onPress,
  numberOfLines,
}: Ifont) {
  const { defaultStyle } = useStyle();
  const fontFamily = bold ? 'Pretendard-SemiBold' : 'Pretendard-Medium';

  return (
    <Text
      onPress={onPress}
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
