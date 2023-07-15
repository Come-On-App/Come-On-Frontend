import { StyleProp, ViewStyle } from 'react-native';

export interface IconfirmCancelButton {
  containerStyle?: StyleProp<ViewStyle>;
  cancelText?: string;
  confirmText?: string;
  onCancelHandler: () => void;
  onConfirmlHandler: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  leftButtonColor?: string;
  rightButtonColor?: string;
}
