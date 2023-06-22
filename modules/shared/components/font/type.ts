import type { StyleProp, TextStyle } from 'react-native';

export interface Ifont {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  bold?: boolean;
}

export interface IscreenFont {
  children: React.ReactNode;
}
