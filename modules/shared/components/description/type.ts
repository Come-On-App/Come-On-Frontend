import { StyleProp, TextStyle } from 'react-native';

export default interface IDescription {
  description: string;
  position?: 'marginBottom' | 'marginTop';
  fontStyle?: StyleProp<TextStyle>;
}
