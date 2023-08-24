import type { IconNode } from '@rneui/base';
import type { IconName } from '@shared/components/icon/type';
import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type OnChangeText = (text: string) => void;

export interface Iinput {
  text: string;
  placeholder?: string;
  onChangeText?: OnChangeText;
  rightIcon?: IconNode;
  label?: ReactNode;
  maxLength?: number;
  disabled?: boolean;
  multiline?: boolean;
  onSubmitEditing?: () => void;
}

export interface IpressableInput {
  text: string;
  icon?: {
    name: IconName;
    color: string;
  };
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  fontColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export interface IcodeField {
  value: string;
  cellCount: number;
  setValue: (arg: string) => void;
  fontStyle?: StyleProp<TextStyle>;
  cursorSymbol?: string;
}
