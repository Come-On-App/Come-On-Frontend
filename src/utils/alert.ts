import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import type { NativeAlert, RefState } from '@type/util.alert';

enum ToastAlert {
  success = 'success',
  error = 'error',
}

export const toast = Toast;

export function nativeAlert(text: NativeAlert) {
  Alert.alert(text.title, text.message);
}

export function mutateStateRefToast(refState: RefState, text: string) {
  if (refState.current) return;

  // eslint-disable-next-line no-param-reassign
  refState.current = true;
  toast.show({
    type: ToastAlert.success,
    text1: text,
  });
}

export function errorAlert(text: string) {
  toast.show({
    type: ToastAlert.error,
    text1: text,
  });
}
