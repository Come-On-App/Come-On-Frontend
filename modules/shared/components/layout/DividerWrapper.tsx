import React from 'react';
import { Divider } from '@rneui/themed';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';
import useStyles from './style';
import { IDividerWrapper } from './type';

/**
 * 스타일 구분선 컴포넌트
 */
export default function DividerWrapper({
  children,
  width = 12,
  position = 'top',
}: IDividerWrapper) {
  const { dividerStyle } = useStyles(width);
  const shouldRenderTopDivider = position === 'top' || position === 'both';
  const shouldRenderBottomDivider =
    position === 'bottom' || position === 'both';

  if (position === 'none') {
    return <View testID={TestId.shared.divider.none}>{children}</View>;
  }

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
