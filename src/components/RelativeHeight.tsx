import React, { Fragment } from 'react';
import { Dimensions, ScrollView } from 'react-native';

import { log } from '@utils/log';
import { RelativeHeightProps } from '@type/component.placeselect';

function RelativeHeight({ children }: RelativeHeightProps) {
  const { width } = Dimensions.get('screen');

  log('width', width);
  const Wrap = width < 375 ? ScrollView : Fragment;

  return <Wrap>{children}</Wrap>;
}

export default RelativeHeight;
