import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import type { NativeAlert, RefState } from '@type/util.alert';

export const toast = Toast;

export function native(text: NativeAlert) {
  Alert.alert(text.title, text.message);
}

export function mutateStateRefToast(refState: RefState, text: string) {
  if (refState.current) return;

  // eslint-disable-next-line no-param-reassign
  refState.current = true;
  toast.show({
    type: 'success',
    text1: text,
  });
}
