import React from 'react';
import { Text, useTheme } from '@rneui/themed';

import { TextProps } from '../types';

function useDefaultStyle() {
  const { theme } = useTheme();
  const defaultStyle = {
    color: theme.grayscale['900'],
    fontSize: theme.textStyles.title4.fontSize,
  };

  return defaultStyle;
}

function Font({ style, children }: TextProps) {
  const defaultStyle = useDefaultStyle();

  return (
    <Text style={[defaultStyle, style, { fontFamily: 'pretendard-Regular' }]}>
      {children}
    </Text>
  );
}

export function BoldFont({ style, children }: TextProps) {
  const defaultStyle = useDefaultStyle();

  return (
    <Text style={[defaultStyle, style, { fontFamily: 'pretendard-Bold' }]}>
      {children}
    </Text>
  );
}

export default Font;
