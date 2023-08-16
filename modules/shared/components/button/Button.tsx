import { Button as RneButton } from '@rneui/themed';
import React from 'react';

import TestId from '@shared/constants/testIds';
import { Pressable, View } from 'react-native';
import useStyles from './style';
import { IappleButton, Ibutton } from './type';
import Font from '../font/Font';

export const DEFUALT_BUTTON_WIDTH = 192;

export default function Button({
  onPress,
  title,
  bold,
  backgroundColor,
  disabled,
}: Ibutton) {
  const { defaultStyle, font } = useStyles({ bold, backgroundColor });

  return (
    <RneButton
      testID={TestId.shared.button.default}
      onPress={onPress}
      title={title}
      buttonStyle={[defaultStyle]}
      titleStyle={[font]}
      disabled={disabled}
    />
  );
}

export function LoginButton({
  buttonStyle,
  fontStyle,
  Icon,
  disabled,
  title,
  onPress,
}: IappleButton) {
  const { loginButtonContainer, loginButtonPressed, loginFont, loginIcon } =
    useStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={(button) => [
        loginButtonContainer,
        buttonStyle,
        button.pressed && loginButtonPressed,
      ]}
    >
      <View style={loginIcon}>{Icon}</View>
      <Font bold style={[loginFont, fontStyle]}>
        {title}
      </Font>
      <View style={loginIcon} />
    </Pressable>
  );
}
