import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { makeStyles } from '@rneui/themed';
import InputText from './InputText';
import InputImage from './InputImage';
import LocaleConfig from '../Calendar/LocaleConfig';
import { InputFormProps } from '../../types';
import Label from './Label';
import Calendar from '../Calendar/Calendar';

function InputForm({ inputProps }: InputFormProps) {
  const styles = useStyles();
  const [touched, setTouched] = useState(false);

  LocaleConfig.defaultLocale = 'kr';

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <InputImage />
      <InputText inputProps={inputProps} />

      <View style={styles.labelContainer}>
        <Label>모임기간</Label>
        <Label style={styles.subLabelStyle}>기간선택</Label>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar />
      </View>
    </KeyboardAvoidingView>
  );
}

export default InputForm;

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  calendarContainer: {
    width: '100%',
    height: 280,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
}));
