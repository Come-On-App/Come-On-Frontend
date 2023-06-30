import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface IcontentHeader {
  children: ReactNode;
}

export interface IscreenLayout {
  children: ReactNode;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
