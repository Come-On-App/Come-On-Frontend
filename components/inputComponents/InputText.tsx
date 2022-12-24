import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { theme } from '../../constants/Colors';
import { View } from '../Themed';
import { PretendardText } from '../StyledText';

interface InputProps {
  inputProps: {
    label: string,
    placeholder: string,
    length: number,
    value: string,
    onChangeText: (enteredValue: string) => void,
    isMultiline: boolean,
  };
}

function InputText({ inputProps }: InputProps) {
  const { label, placeholder, length, onChangeText, value, isMultiline } =
    inputProps;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <PretendardText style={styles.label}>{label}</PretendardText>
        <PretendardText style={styles.length}>
          {value.length}/{length}
        </PretendardText>
      </View>
      <View>
        <TextInput
          style={[styles.textInput, isMultiline && styles.inputMultiline]}
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
    marginHorizontal: 20,
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
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
