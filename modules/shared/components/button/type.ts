import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { IconName } from '../icon/type';

export interface IiconButton {
  onPress: () => void;
  color: string;
  size: number;
  name: IconName;
  _pressed?: boolean;
}

export interface Ibutton {
  onPress: () => void;
  title: string;
  bold?: boolean;
  backgroundColor?: string;
  disabled?: boolean;
  Icon?: ReactNode;
}

export interface IappleButton {
  buttonStyle?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  title: string;
  Icon: ReactNode;
  disabled?: boolean;
  onPress: () => void;
}
