import { View } from 'react-native';
import React from 'react';
import { IscreenLayout } from './type';
import useStyles from './style';

export default function ScreenLayout({ children, testID }: IscreenLayout) {
  const { container } = useStyles();

  return (
    <View testID={testID} style={container}>
      {children}
    </View>
  );
}
