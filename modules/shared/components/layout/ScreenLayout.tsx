import { ScrollView, View } from 'react-native';
import React from 'react';

import { IScreenLayout } from './type';
import useStyles from './style';

/**
 * 페이지 스크린 레이아웃
 */
export default function ScreenLayout({
  children,
  testID,
  containerStyle,
  scroll,
}: IScreenLayout) {
  const { container } = useStyles();
  const Component = scroll ? ScrollView : View;

  return (
    <Component testID={testID} style={[container, containerStyle]}>
      {children}
    </Component>
  );
}
