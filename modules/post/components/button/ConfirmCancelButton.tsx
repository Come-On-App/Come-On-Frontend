/* eslint-disable @typescript-eslint/no-empty-function */
import { View } from 'react-native';
import React from 'react';

import Button from '@shared/components/button/Button';
import useStyles from '../card/button/style';
import { IconfirmCancelButton } from './type';

const CANCEL = '취소';
const CONFIRM = '완료';

export default function ConfirmCancelButton({
  cancelText,
  confirmText,
  containerStyle,
  onCancelHandler,
  onConfirmlHandler,
}: IconfirmCancelButton) {
  const { area, leftArea, rightArea, leftButton } = useStyles();

  return (
    <View style={[area, containerStyle]}>
      <View style={leftArea}>
        <Button
          bold
          title={cancelText ?? CANCEL}
          onPress={onCancelHandler}
          backgroundColor={leftButton.backgroundColor}
        />
      </View>
      <View style={rightArea}>
        <Button
          title={confirmText ?? CONFIRM}
          onPress={onConfirmlHandler}
          bold
        />
      </View>
    </View>
  );
}
