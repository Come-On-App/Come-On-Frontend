import React from 'react';

import { Divider } from '@rneui/themed';
import { View } from 'react-native';

import useStyles from './style';
import { IcontentHeader } from './type';

/**
 * 스타일 구분선 컴포넌트
 */
export default function DividerWrapper({ children }: IcontentHeader) {
  const {
    dividerStyle: { width, color },
  } = useStyles();

  return (
    <View>
      <Divider width={width} color={color} />
      {children}
    </View>
  );
}
