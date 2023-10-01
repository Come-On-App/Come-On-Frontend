import { ReactNode } from 'react';
import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

export interface IContentHeader {
  children: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}

export type DividerPosition = 'top' | 'bottom' | 'both' | 'none';

export type OnLayout = (event: LayoutChangeEvent) => void;

export interface IDividerWrapper {
  width?: number;
  children: ReactNode;
  position?: DividerPosition;
  customStyle?: StyleProp<ViewStyle>;
  onLayout?: OnLayout;
}

export interface IScreenLayout {
  children: ReactNode;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
}

export interface ISpacer {
  height: number;
  applyRelative?: boolean;
}
