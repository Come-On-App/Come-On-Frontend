import React from 'react';
import { Input as RnInput } from '@rneui/themed';
import useStyles from './style';

import { Iinput } from './type';

export default function Input({ text, placeholder, onChangeText }: Iinput) {
  const { outerContainer, inputContainer, placeholderText, font } = useStyles();

  return (
    <RnInput
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
