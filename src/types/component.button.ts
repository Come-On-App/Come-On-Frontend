import { StyleProp, ViewStyle } from 'react-native';

import type { Icon } from '@type/index';

export interface CancelIconButtonWithActionProps {
  actionFn: () => void;
}

export type ButtonStyle = {
  backgroundColor: string;
  width: number | string;
  height: number | string;
  borderRadius?: number;
  marginRight?: number | string;
};

type ButtonTextStyle = {
  fontSize: number;
  color: string;
};

export interface ButtonProps {
  text: string;
  bold?: boolean;
  onPress: () => void;
  height?: number;
  disabled?: boolean;
  loading?: boolean;
  textStyle?: Partial<ButtonTextStyle>;
  buttonStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
}

type ButtonGroupStyle = {
  width: number;
  backgroundColor: string;
};

type ButtonConfig = {
  text: string;
  onPress: () => void;
  style?: Partial<ButtonGroupStyle>;
};

export interface ButtonGroupProps {
  height?: number;
  spacing?: number;
  firstButton: ButtonConfig;
  secondButton: ButtonConfig;
}

export interface IconButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  icon: Icon;
}
