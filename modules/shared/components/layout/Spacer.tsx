import { View } from 'react-native';
import React from 'react';

import { relativeSizeConverter } from '@shared/utils';
import { ISpacer } from './type';

/**
 * 특정 간격을 유지시키는 추상화 컴포넌트
 */
export default function Spacer({ height, applyRelative }: ISpacer) {
  return (
    <View
      style={{
        height: applyRelative ? relativeSizeConverter(height) : height,
      }}
    />
  );
}

/**
 * 조건에 따라서 화면 너비 전체를 포함하는 컴포넌트를 렌더링 한다.
 */
export function FullScreenWrapper({ isHide }: { isHide: boolean }) {
  if (isHide) return null;

  return <View style={{ flex: 1 }} />;
}
