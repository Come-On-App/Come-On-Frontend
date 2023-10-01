import type { ReactNode, RefObject } from 'react';
import type {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { IconNode, Input as BaseInput } from '@rneui/base';

import type { IconName } from '@shared/components/icon/type';

export type RNEInputRef = TextInput & BaseInput;

export type RNEInputRefObject = RefObject<RNEInputRef>;

export type OnChangeText = (text: string) => void;

export type OnFocus = (
  e: NativeSyntheticEvent<TextInputFocusEventData>,
) => void;

export interface IInput {
  text: string;
  placeholder?: string;
  onChangeText?: OnChangeText;
  rightIcon?: IconNode;
  label?: ReactNode;
  maxLength?: number;
  disabled?: boolean;
  multiline?: boolean;
  errorMessage?: string;
  inputStyle?: StyleProp<TextStyle>;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  blurOnSubmit?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: OnFocus;
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
