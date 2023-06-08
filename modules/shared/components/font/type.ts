import type { StyleProp, TextStyle } from 'react-native';

export interface FontProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  bold?: boolean;
}
