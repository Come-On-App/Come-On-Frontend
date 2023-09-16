import type { ReturnKeyTypeOptions, StyleProp, TextStyle } from 'react-native';

import type { OnChangeText } from '@shared/components/input/type';
import type { DividerPosition } from '@shared/components/layout/type';

export interface IPostInput {
  title: string;
  errorMessage?: string;
  placeholder?: string;
  lengthMax: number;
  onInput: OnChangeText;
  prevPayload?: string | null;
  isDataLoading?: boolean;
  multiline?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  dividerPosition?: DividerPosition;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  blurOnSubmit?: boolean;
}
