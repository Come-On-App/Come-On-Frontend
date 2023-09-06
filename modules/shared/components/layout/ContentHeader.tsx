import React from 'react';
import { View } from 'react-native';

import { IContentHeader } from '@shared/components/layout/type';
import useStyles from './style';

export default function ContentHeader({
  children,
  customStyle,
}: IContentHeader) {
  const { cContentHeader } = useStyles();

  return <View style={[cContentHeader, customStyle]}>{children}</View>;
}
