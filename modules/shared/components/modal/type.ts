import { StyleProp, ViewStyle } from 'react-native';

export interface Imodal {
  isVisible: boolean;
  children: React.ReactNode;
  onBackdropPress: () => void;
  testID: string;
  modalStyle?: StyleProp<ViewStyle>;
}
