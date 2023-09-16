import React from 'react';
import { Text } from '@rneui/themed';

import { Ifont, IscreenFont } from './type';
import useStyles from './style';

/**
 * 기본 폰트 크기는 14px
 */
export default function Font({
  style,
  children,
  bold,
  onPress,
  numberOfLines,
}: Ifont) {
  const { defaultStyle } = useStyles();
  const fontFamily = bold ? 'Pretendard-SemiBold' : 'Pretendard-Medium';

  return (
    <Text
      onPress={onPress}
      style={[defaultStyle, style, { fontFamily }]}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
    >
      {children}
    </Text>
  );
}

export function ScreenTitle({ children }: IscreenFont) {
  const { screenFont } = useStyles();

  return (
    <Font bold style={screenFont}>
      {children}
    </Font>
  );
}
