import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { IconName } from '../icon/type';

export interface IIconButton {
  onPress: () => void;
  color: string;
  size: number;
  name: IconName;
  containerStyle?: StyleProp<ViewStyle>;
  _pressed?: boolean;
}

export interface IButton {
  onPress: () => void;
  title: string;
  bold?: boolean;
  backgroundColor?: string;
  disabled?: boolean;
  Icon?: ReactNode;
}

export interface IAppleButton {
  buttonStyle?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  title: string;
  Icon: ReactNode;
  disabled?: boolean;
  onPress: () => void;
}

export interface IConfirmCancelButton {
  containerStyle?: StyleProp<ViewStyle>;
  cancelText?: string;
  confirmText?: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  leftButtonColor?: string;
  rightButtonColor?: string;
}

export interface IAddButton {
  testID?: string;
  onPress: () => void;
  iconName?: IconName;
  containerStyle?: StyleProp<ViewStyle>;
  radius?: boolean;
}
