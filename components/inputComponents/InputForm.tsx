import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, FlatList } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import { Theme as CalendarTheme } from 'react-native-calendars/src/types';
import XDate from 'xdate';
import InputText from './InputText';
import InputImage from './InputImage';
import LocaleConfig from '../Calendar/LocaleConfig';
import { InputFormProps } from '../../types';
import Label from './Label';
import Calendar from '../Calendar/Calendar';

function InputForm({ inputProps }: InputFormProps) {
  const styles = useStyles();

  LocaleConfig.defaultLocale = 'kr';

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <KeyboardAvoidingView behavior="padding">
          <InputImage />
          <InputText inputProps={inputProps} />
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.labelContainer}>
        <Label>모임기간</Label>
        <Label style={styles.subLabelStyle}>기간선택</Label>
      </View>
      <Calendar />
    </View>
  );
}

export default InputForm;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  subLabelStyle: {
    color: theme.grayscale[700],
    lineHeight: theme.textStyles.body1.lineHeight,
    fontSize: theme.textStyles.body1.fontSize,
    fontWeight: 'normal', // TODO 추후 normal Weight로 재설정
  },
  scrollContainer: {
    flex: 8,
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
}));
