import React from 'react';
import { Keyboard } from 'react-native';
import { Overlay, makeStyles } from '@rneui/themed';

import type { ModalProps } from '../types';

export default function Modal({ isVisible, children, style }: ModalProps) {
  const styles = useStyles();

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={[styles.overlay, style]}
      onBackdropPress={Keyboard.dismiss}
    >
      {children}
    </Overlay>
  );
}

const useStyles = makeStyles(theme => ({
  overlay: {
    backgroundColor: theme.grayscale['0'],
    height: 240,
    width: '70%',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 28,
  },
}));
