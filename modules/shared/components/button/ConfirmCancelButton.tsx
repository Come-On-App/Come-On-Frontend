import { View } from 'react-native';
import React from 'react';

import Button from '@shared/components/button/Button';
import useStyles from './style';
import { IconfirmCancelButton } from './type';

const CANCEL = '취소';
const CONFIRM = '완료';

export default function ConfirmCancelButton({
  cancelText,
  confirmText,
  containerStyle,
  onPressLeft,
  onPressRight,
  leftDisabled,
  rightDisabled,
  leftButtonColor,
  rightButtonColor,
}: IconfirmCancelButton) {
  const { area, leftArea, rightArea, leftButton, rightButton } = useStyles({
    leftButtonColor,
    rightButtonColor,
  });

  return (
    <View style={[area, containerStyle]}>
      <View style={leftArea}>
        <Button
          bold
          disabled={leftDisabled}
          title={cancelText ?? CANCEL}
          onPress={onPressLeft}
          backgroundColor={leftButton.backgroundColor}
        />
      </View>
      <View style={rightArea}>
        <Button
          bold
          disabled={rightDisabled}
          title={confirmText ?? CONFIRM}
          onPress={onPressRight}
          backgroundColor={rightButton.backgroundColor}
        />
      </View>
    </View>
  );
}
