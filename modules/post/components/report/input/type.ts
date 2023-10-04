import { Dispatch, SetStateAction } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { OnChangeText } from '@shared/components/input/type';

export interface IContent {
  onInput: OnChangeText;
  hasChanged: boolean;
  onLayout: (event: LayoutChangeEvent, itemKey: string) => void;
  onFocus: Dispatch<SetStateAction<string | null>>;
}
