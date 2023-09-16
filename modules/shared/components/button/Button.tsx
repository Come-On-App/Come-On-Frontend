import { Pressable, View } from 'react-native';
import { Button as RneButton } from '@rneui/themed';
import React from 'react';

import TestId from '@shared/constants/testIds';
import useStyles from './style';
import { IAddButton, IAppleButton, IButton } from './type';
import Font from '../font/Font';
import IconButton from './IconButton';

export const DEFUALT_BUTTON_WIDTH = 192;

export default function Button({
  onPress,
  title,
  bold,
  backgroundColor,
  disabled,
  Icon,
}: IButton) {
  const { defaultStyle, font } = useStyles({ bold, backgroundColor });

  return (
    <RneButton
      testID={TestId.shared.button.default}
      onPress={onPress}
      buttonStyle={[defaultStyle]}
      titleStyle={[font]}
      disabled={disabled}
    >
      {Icon || null}
      {title}
    </RneButton>
  );
}

export function LoginButton({
  buttonStyle,
  fontStyle,
  Icon,
  disabled,
  title,
  onPress,
}: IAppleButton) {
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

export function StyledIconButton({
  testID,
  onPress,
  containerStyle,
  radius,
  iconName = 'add',
}: IAddButton) {
  const { addButtonContainer, addButtonIcon } = useStyles();

  return (
    <View testID={testID} style={addButtonContainer}>
      <IconButton
        containerStyle={[
          containerStyle,
          radius && { borderRadius: addButtonIcon.size },
        ]}
        onPress={onPress}
        name={iconName}
        color={addButtonIcon.color}
        size={addButtonIcon.size}
      />
    </View>
  );
}
