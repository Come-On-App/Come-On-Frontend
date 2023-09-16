import React, { forwardRef, useRef } from 'react';
import { Input as RnInput } from '@rneui/themed';
import { Pressable } from 'react-native';

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
    keyboardType,
  } = props;
  const {
    font,
    outerContainer,
    inputContainer,
    placeholderText,
    inputLabelFont,
  } = useStyles(multiline);
  const inputRef = useRef<RNEInputRef>(null);
  const handlePress = () => {
    if (multiline && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <RnInput
        ref={ref || inputRef}
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
        inputStyle={[
          font,
          inputStyle,
          multiline && { alignSelf: 'flex-start' },
        ]}
        onChangeText={onChangeText}
        errorMessage={errorMessage}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        blurOnSubmit={blurOnSubmit}
        labelStyle={inputLabelFont}
        autoCapitalize="none"
      />
    </Pressable>
  );
});

export default Input;
