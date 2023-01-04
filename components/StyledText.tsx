import React from 'react';
import { Text } from '@rneui/themed';
import theme from '../constants/themed';
import { TextProps } from '../types';

function Font({ style, children }: TextProps) {
  return (
    <Text
      style={[Font.defaultProps.style, style, { fontFamily: 'pretendard' }]}
    >
      {children}
    </Text>
  );
}

export function PretendardText({ style, children }: TextProps) {
  return <Text style={[style, { fontFamily: 'pretendard' }]}>{children}</Text>;
}

export default Font;

Font.defaultProps = {
  style: {
    color: theme.grayscale?.[900],
    fontSize: theme.textStyles?.title4?.fontSize,
    lineHeight: theme.textStyles?.title4?.lineHeight,
  },
};
