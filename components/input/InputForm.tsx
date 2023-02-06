import React, { useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import { makeStyles } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';
import InputBox from './InputText';
import InputImage from './InputImage';
import { InputFormProps } from '../../types';
import Font from '../Font';

function InputForm({ inputProps }: InputFormProps) {
  const styles = useStyles();
  const [date, setDate] = useState<string>();
  const navigation = useNavigation();
  const onPressLabel = () => {
    navigation.navigate('CreateMeeting2');
  };
  // const onChangeHandler = () => {};

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <InputImage />
      <InputBox config={inputProps} style={{ textAlignVertical: 'center' }} />
      <View style={styles.inputContainer}>
        <Font style={styles.title}>모임 캘린더</Font>
        <Pressable style={styles.inputContainer} onPress={onPressLabel}>
          <TextInput
            placeholder="날짜 범위를 선택해주세요"
            editable={false}
            placeholderTextColor={styles.meetingNoteInput.placeholder}
            style={styles.meetingNoteInput}
            value={date}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default InputForm;

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 12,
  },
  meetingNoteInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    textAlignVertical: 'center',
    placeholder: theme.grayscale['500'],
    borderColor: theme.grayscale['200'],
  },
  subLabelStyle: {
    color: theme.grayscale[700],
    lineHeight: theme.textStyles.body1.lineHeight,
    fontSize: theme.textStyles.body1.fontSize,
    fontWeight: 'normal', // TODO 추후 normal Weight로 재설정
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  overlayStyle: {
    width: '90%',
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  calendarViewStyle: {
    width: '100%',
    height: 700,
  },
}));
