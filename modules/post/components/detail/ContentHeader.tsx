import React from 'react';
import { View } from 'react-native';

import { IcontentHeader } from './type';
import useStyles from './style';

export default function ContentHeader({ children }: IcontentHeader) {
  const { cContentHeader } = useStyles();

  return <View style={cContentHeader}>{children}</View>;
}
