import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

import { relativeSizeConverter } from '@shared/utils';

const containerStyle: StyleProp<ViewStyle> = {
  width: '85%',
};

const contentContainerStyle: StyleProp<ViewStyle> = {
  paddingHorizontal: 15,
};

const text1Style: StyleProp<TextStyle> = {
  fontSize: relativeSizeConverter(16),
  fontFamily: 'Pretendard-SemiBold',
  color: '#212121',
};

const text2Style: StyleProp<TextStyle> = {
  fontSize: relativeSizeConverter(12),
  fontFamily: 'Pretendard-Medium',
  color: '#757575',
};

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        ...containerStyle,
        borderLeftColor: '#20BD4A',
      }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        ...containerStyle,
        borderLeftColor: '#F05E51',
      }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      style={{
        ...containerStyle,
        borderLeftColor: '#24ABE4',
      }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
};
