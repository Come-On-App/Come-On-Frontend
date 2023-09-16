import type { StyleProp, TextStyle } from 'react-native';

export interface IList {
  name: string;
  onPress: (hideMenuHandler: () => void) => void;
  fontStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export interface IMenu {
  anchor: React.ReactNode;
  list: IList[];
  fontAllStyle?: StyleProp<TextStyle>;
  modalComponent?: JSX.Element;
}
