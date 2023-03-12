import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import type { NativeAlert } from '@type/util.alert';

enum ToastAlert {
  success = 'success',
  error = 'error',
}

export const toast = Toast;

export function nativeAlert(text: NativeAlert) {
  Alert.alert(text.title, text.message);
}

export function successAlert(text: string) {
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
