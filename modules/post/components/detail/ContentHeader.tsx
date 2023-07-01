import React from 'react';
import { View } from 'react-native';

import { IcontentHeader } from '@shared/components/layout/type';
import useStyles from './style';

export default function ContentHeader({
  children,
  customStyle,
}: IcontentHeader) {
  const { cContentHeader } = useStyles();

  return <View style={[cContentHeader, customStyle]}>{children}</View>;
}
