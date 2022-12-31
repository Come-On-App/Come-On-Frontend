import React from 'react';
import { Text } from '@rneui/themed';

import { TextProps } from '../types';

function Font({ style, children }: TextProps) {
  return <Text style={[style, { fontFamily: 'pretendard' }]}>{children}</Text>;
}

export function PretendardText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'pretendard' }]} />
  );
}

export default Font;
