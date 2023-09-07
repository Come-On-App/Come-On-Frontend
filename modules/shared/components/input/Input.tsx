import React, { forwardRef } from 'react';
import { Input as RnInput } from '@rneui/themed';

import useStyles from './style';
import { IInput, RNEInputRef } from './type';

const Input = forwardRef<RNEInputRef, IInput>((props, ref) => {
  const {
    text,
    placeholder,
    onChangeText,
    label,
    disabled,
    maxLength,
    rightIcon,
    multiline,
    onSubmitEditing,
    errorMessage,
    inputStyle,
    returnKeyType,
    blurOnSubmit,
  } = props;
  const { outerContainer, inputContainer, placeholderText, font } =
    useStyles(multiline);

  return (
    <RnInput
      ref={ref}
      onSubmitEditing={onSubmitEditing}
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
      inputStyle={[font, inputStyle]}
      onChangeText={onChangeText}
      errorMessage={errorMessage}
      returnKeyType={returnKeyType}
      blurOnSubmit={blurOnSubmit}
    />
  );
});

export default Input;
