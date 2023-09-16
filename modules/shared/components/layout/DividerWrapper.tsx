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
  customStyle,
}: IDividerWrapper) {
  const { dividerStyle } = useStyles(width);
  const shouldRenderTopDivider = position === 'top' || position === 'both';
  const shouldRenderBottomDivider =
    position === 'bottom' || position === 'both';

  if (position === 'none') {
    return (
      <View testID={TestId.shared.divider.none} style={customStyle}>
        {children}
      </View>
    );
  }

  return (
    <View style={customStyle}>
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

export function StyledDivider({ width }: { width: number }) {
  const { dividerStyle } = useStyles(width);

  return <Divider width={dividerStyle.width} color={dividerStyle.color} />;
}
