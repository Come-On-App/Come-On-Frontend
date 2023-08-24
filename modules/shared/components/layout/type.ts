import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface IcontentHeader {
  children: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}

export type DividerPosition = 'top' | 'bottom' | 'both';

export interface IdividerWrapper {
  width?: number;
  children: ReactNode;
  position?: DividerPosition;
}

export interface IscreenLayout {
  children: ReactNode;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
