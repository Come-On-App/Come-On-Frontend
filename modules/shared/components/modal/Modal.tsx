import React from 'react';
import { Overlay } from '@rneui/themed';

import useStyles from './style';
import { Imodal } from './type';

export default function Modal({
  testID,
  isVisible,
  children,
  modalStyle,
  onBackdropPress,
}: Imodal) {
  const { container } = useStyles();

  return (
    <Overlay
      testID={testID}
      isVisible={isVisible}
      overlayStyle={[container, modalStyle]}
      onBackdropPress={onBackdropPress}
    >
      {children}
    </Overlay>
  );
}
