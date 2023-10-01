import React from 'react';
import { Pressable, Keyboard } from 'react-native';

import { fullScreenContainer } from '@shared/constants/style';
import { IKeyboardDismissView } from './type';

export default function KeyboardDismissView({
  children,
  fullScreen = false,
}: IKeyboardDismissView) {
  return (
    <Pressable
      style={[fullScreen && fullScreenContainer]}
      onPress={Keyboard.dismiss}
    >
      {children}
    </Pressable>
  );
}
