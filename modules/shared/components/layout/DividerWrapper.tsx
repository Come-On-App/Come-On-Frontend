import React from 'react';

import { Divider } from '@rneui/themed';
import { View } from 'react-native';

import useStyles from './style';
import { IdividerWrapper } from './type';

/**
 * 스타일 구분선 컴포넌트
 */
export default function DividerWrapper({
  children,
  width = 12,
  position = 'top',
}: IdividerWrapper) {
  const { dividerStyle } = useStyles(width);
  const shouldRenderTopDivider = position === 'top' || position === 'both';
  const shouldRenderBottomDivider =
    position === 'bottom' || position === 'both';

  return (
    <View>
      {shouldRenderTopDivider && (
        <Divider width={dividerStyle.width} color={dividerStyle.color} />
      )}
      {children}
      {shouldRenderBottomDivider && (
        <Divider width={dividerStyle.width} color={dividerStyle.color} />
      )}
    </View>
  );
}
