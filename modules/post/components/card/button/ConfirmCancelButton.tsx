/* eslint-disable @typescript-eslint/no-empty-function */
import { View } from 'react-native';
import React from 'react';
import Button from '@shared/components/button/Button';
import useStyles from './style';
import { IconfirmCancelButton } from './type';

const CANCEL = '취소';
const CONFIRM = '완료';

export default function ConfirmCancelButton({
  containerStyle,
}: IconfirmCancelButton) {
  const { area, leftArea, rightArea, leftButton } = useStyles();
  const onCancelHandler = () => {};
  const onConfirmlHandler = () => {};

  return (
    <View style={[area, containerStyle]}>
      <View style={leftArea}>
        <Button
          bold
          title={CANCEL}
          onPress={onCancelHandler}
          backgroundColor={leftButton.backgroundColor}
        />
      </View>
      <View style={rightArea}>
        <Button title={CONFIRM} onPress={onConfirmlHandler} bold />
      </View>
    </View>
  );
}
