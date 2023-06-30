import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface IcontentHeader {
  width?: number;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'both';
}

export interface IscreenLayout {
  children: ReactNode;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
