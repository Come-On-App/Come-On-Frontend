import React from 'react';
import { makeStyles } from '@rneui/themed';
import { TextInput, View } from 'react-native';

import { BoldFont, Font } from '../Font';
import type {
  InputProps,
  InputTopProps,
  InputBoxTopTitleProps,
  InputBoxTopTextLengthProps,
  InputBoxProps,
  InputFormAnimProps,
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

export function AnimationInputBox({
  inputProps,
  AnimationView,
}: InputFormAnimProps) {
  const { label, placeholder, maxLength, onChangeText, value, multiline } =
    inputProps;

  return (
    <View>
      <InputBoxTop label={label} maxLength={maxLength} text={value} />
      <AnimationView id="name">
        <InputBoxMain
          value={value}
          maxLength={maxLength}
          multiline={multiline}
          placeholder={placeholder}
          onChangeText={onChangeText}
          style={{ textAlignVertical: 'center' }}
        />
      </AnimationView>
    </View>
  );
}

export function InputBoxTop({ label, text, maxLength }: InputTopProps) {
  const styles = useStyles();

  return (
    <View style={styles.inputTextContainer}>
      <InputBoxTopTitle label={label} />
      <InputBoxTopTextLength text={text} maxLength={maxLength} />
    </View>
  );
}

export function InputBoxMain(props: InputProps) {
  const { value, maxLength, multiline, placeholder, onChangeText, style } =
    props;
  const styles = useStyles();

  return (
    <View style={styles.inputContainer}>
      <Input
        value={value}
        maxLength={maxLength}
        multiline={multiline}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={style}
      />
    </View>
  );
}

export function InputBoxTopTitle({
  label,
  style,
  bold,
}: InputBoxTopTitleProps) {
  const styles = useStyles();
  const TitleText = bold ? BoldFont : Font;

  return <TitleText style={[styles.title, style]}>{label}</TitleText>;
}

export function InputBoxTopTextLength({
  text,
  maxLength,
  style,
}: InputBoxTopTextLengthProps) {
  const styles = useStyles();

  return (
    <Font style={[styles.inputLengthText, style]}>
      {text.length}/{maxLength}
    </Font>
  );
}

export function Input(props: InputProps) {
  const { value, maxLength, onChangeText, placeholder, multiline, style } =
    props;
  const styles = useStyles();

  return (
    <TextInput
      value={value}
      maxLength={maxLength}
      multiline={multiline}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.meetingNoteInput, multiline && styles.multiline, style]}
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
  dateContainer: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    textAlignVertical: 'center',
    borderColor: theme.grayscale['200'],
  },
}));
