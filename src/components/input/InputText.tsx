import React, { useEffect } from 'react';
import { makeStyles } from '@rneui/themed';
import { TextInput, View } from 'react-native';

import useAnimationBounce from '@hooks/useAnim';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setMeetingName } from '@features/meetingSlice';
import { BoldFont, Font } from '../Font';
import type {
  InputProps,
  InputTopProps,
  InputBoxTopTitleProps,
  InputBoxTopTextLengthProps,
} from '../../types';

export default function InputBox({
  AnimView,
  inputProps,
}: any & { AnimView: any }) {
  const { label, placeholder, maxLength, onChangeText, value, multiline } =
    inputProps;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMeetingName(value));
  }, [dispatch, value]);

  return (
    <View>
      <InputBoxTop label={label} maxLength={maxLength} text={value} />
      <AnimView id="name">
        <InputBoxMain
          value={value}
          maxLength={maxLength}
          multiline={multiline}
          placeholder={placeholder}
          onChangeText={onChangeText}
        />
      </AnimView>
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
