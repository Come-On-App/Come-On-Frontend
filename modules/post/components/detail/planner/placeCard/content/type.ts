import { Dispatch, SetStateAction } from 'react';

import { LayoutChangeEvent } from 'react-native';

export interface IContent {
  onLayout: (event: LayoutChangeEvent, itemKey: string) => void;
  onFocus: Dispatch<SetStateAction<string | null>>;
}
