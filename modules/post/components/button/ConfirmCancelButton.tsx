/* eslint-disable @typescript-eslint/no-empty-function */
import { View } from 'react-native';
import React from 'react';

import Button from '@shared/components/button/Button';
import { withSelectionHaptic } from '@shared/utils/haptics';
import useStyles from './style';
import { IconfirmCancelButton } from './type';

const CANCEL = '취소';
const CONFIRM = '완료';

// TODO: 공용 폴더로 승급하기
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
  const [onPressRightWithHaptic] = withSelectionHaptic(onPressRight);

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
          onPress={onPressRightWithHaptic}
          backgroundColor={rightButton.backgroundColor}
        />
      </View>
    </View>
  );
}
