import type { StyleProp, TextStyle } from 'react-native';

export interface IList {
  name: string;
  onPress: () => void;
  fontStyle?: StyleProp<TextStyle>;
}

export interface IMenu {
  anchor: React.ReactNode;
  list: IList[];
  fontAllStyle?: StyleProp<TextStyle>;
  modalComponent?: JSX.Element;
}
