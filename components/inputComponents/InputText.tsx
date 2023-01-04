import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import theme from '../../constants/themed';
import Font from '../StyledText';
import { InputProps } from '../../types';

function InputText({ inputProps, style }: InputProps) {
  const { label, placeholder, length, onChangeText, value, isMultiline } =
    inputProps;

  return (
    <View style={[styles.container]}>
      <View style={styles.labelContainer}>
        <Font style={styles.label}>{label}</Font>
        <Font style={styles.length}>
          {value.length}/{length}
        </Font>
      </View>
      <View
        style={(styles.textContainer, isMultiline && styles.inputMultiline)}
      >
        <TextInput
          style={[styles.textInput, isMultiline && { minHeight: 100 }]}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={theme.grayscale?.[500]}
          onChangeText={onChangeText}
          maxLength={length}
          multiline={isMultiline}
        />
      </View>
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: theme.grayscale?.[900],
    fontSize: theme.textStyles?.title4?.fontSize,
    lineHeight: theme.textStyles?.title4?.lineHeight,
    fontWeight: 'bold',
  },
  length: {
    color: theme.grayscale?.[500],
  },
  textInput: {
    borderColor: theme.grayscale?.[200],
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    minHeight: 44,
    height: 44,
    marginTop: 13,
    padding: 12,

    textAlignVertical: 'top',
  },
  inputMultiline: {
    minHeight: 113,
  },
  textContainer: {},
});
