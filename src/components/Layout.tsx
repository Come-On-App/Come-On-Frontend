import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface LayoutProps {
  containerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * 테스트 컴포넌트
 */
// 모임 상세 레이아웃 (모임 디테일)
export default function Layout({ containerStyle, children }: LayoutProps) {
  return (
    <View style={[containerStyle, { width: '100%', marginVertical: 5 }]}>
      {children}
    </View>
  );
}
