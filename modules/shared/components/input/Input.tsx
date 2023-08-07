import React from 'react';
import { Input as RnInput } from '@rneui/themed';
import useStyles from './style';

import { Iinput } from './type';

export default function Input({
  text,
  placeholder,
  onChangeText,
  label,
  disabled,
  maxLength,
  rightIcon,
  multiline,
}: Iinput) {
  const { outerContainer, inputContainer, placeholderText, font } =
    useStyles(multiline);

  return (
    <RnInput
      multiline={multiline}
      disabled={disabled}
      maxLength={maxLength}
      label={label}
      rightIcon={rightIcon}
      value={text}
      placeholder={placeholder}
      containerStyle={outerContainer}
      inputContainerStyle={inputContainer}
      placeholderTextColor={placeholderText.color}
      inputStyle={font}
      onChangeText={onChangeText}
    />
  );
}
