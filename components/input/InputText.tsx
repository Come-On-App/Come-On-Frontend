import React from 'react';
import { makeStyles } from '@rneui/themed';
import { TextInput, View } from 'react-native';

import { Font } from '../Font';
import type {
  InputProps,
  InputBoxProps,
  InputTopProps,
  InputBoxTopTitleProps,
  InputBoxTopTextLengthProps,
} from '../../types';

export default function InputBox({ config }: InputBoxProps) {
  const { label, placeholder, maxLength, onChangeText, value, multiline } =
    config;

  return (
    <View>
      <InputBoxTop label={label} maxLength={maxLength} text={value} />
      <InputBoxMain
        value={value}
        maxLength={maxLength}
        multiline={multiline}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function InputBoxTop({ label, text, maxLength }: InputTopProps) {
  const styles = useStyles();

  return (
    <View style={styles.inputTextContainer}>
      <InputBoxTopTitle label={label} />
      <InputBoxTopTextLength text={text} maxLength={maxLength} />
    </View>
  );
}

function InputBoxMain(props: InputProps) {
  const { value, maxLength, multiline, placeholder, onChangeText } = props;
  const styles = useStyles();

  return (
    <View style={styles.inputContainer}>
      <Input
        value={value}
        maxLength={maxLength}
        multiline={multiline}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function InputBoxTopTitle({ label }: InputBoxTopTitleProps) {
  const styles = useStyles();

  return <Font style={styles.title}>{label}</Font>;
}

function InputBoxTopTextLength({
  text,
  maxLength,
}: InputBoxTopTextLengthProps) {
  const styles = useStyles();

  return (
    <Font style={styles.inputLengthText}>
      {text.length}/{maxLength}
    </Font>
  );
}

function Input(props: InputProps) {
  const { value, maxLength, onChangeText, placeholder, multiline } = props;
  const styles = useStyles();

  return (
    <TextInput
      value={value}
      maxLength={maxLength}
      multiline={multiline}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.meetingNoteInput, multiline && styles.multiline]}
      placeholderTextColor={styles.meetingNoteInput.placeholder}
    />
  );
}

const useStyles = makeStyles(theme => ({
  meetingNoteInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    textAlignVertical: 'top',
    placeholder: theme.grayscale['500'],
    borderColor: theme.grayscale['200'],
  },
  title: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 12,
  },
  inputTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLengthText: {
    fontSize: 14,
    color: theme.grayscale['500'],
  },
  multiline: {
    minHeight: 100,
    maxHeight: 100,
  },
}));
