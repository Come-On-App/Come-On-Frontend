import React from 'react';
import { StyleSheet, TextInput, TextStyle, StyleProp } from 'react-native';
import { theme } from '../../constants/Colors';
import { View } from '../Themed';
import { PretendardText } from '../StyledText';
import { InputProps } from '../../types';

function InputText({ inputProps, style }: InputProps) {
  const { label, placeholder, length, onChangeText, value, isMultiline } =
    inputProps;
  const inputStyles: StyleProp<TextStyle> = [styles.container];
  const inputStyle = style;

  if (isMultiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={inputStyles}>
      <View style={styles.labelContainer}>
        <PretendardText style={styles.label}>{label}</PretendardText>
        <PretendardText style={styles.length}>
          {value.length}/{length}
        </PretendardText>
      </View>
      <View style={isMultiline && styles.inputMultiline}>
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
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
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
    height: 44,
    marginTop: 13,
    padding: 12,
    textAlignVertical: 'top',
  },
  inputMultiline: {
    minHeight: 113,
  },
});

InputText.defaultProps = {
  style: styles.textInput,
};
