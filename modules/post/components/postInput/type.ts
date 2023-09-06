import { OnChangeText } from '@shared/components/input/type';
import { DividerPosition } from '@shared/components/layout/type';
import { StyleProp, TextStyle } from 'react-native';

export interface ImeetingNameInput {
  title: string;
  errorMessage?: string;
  placeholder?: string;
  lengthMax: number;
  onInput: OnChangeText;
  prevMeetingName?: string | null;
  isDataLoading?: boolean;
  multiline?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  dividerPosition?: DividerPosition;
}
