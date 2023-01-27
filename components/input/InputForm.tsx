import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Pressable } from 'react-native';
import { makeStyles, Overlay } from '@rneui/themed';

import InputBox from './InputText';
import InputImage from './InputImage';
import LocaleConfig from '../calendar/LocaleConfig';
import {
  InputFormProps,
  MeetingTitleProps,
  OverayCalendarProps,
} from '../../types';
import Label from './Label';
import Calendar from '../calendar/Calendar';

function InputForm({ inputProps }: InputFormProps) {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);
  const onPressLabel = () => {
    setVisible(!visible);
  };

  LocaleConfig.defaultLocale = 'kr';

  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <InputImage />
        <InputBox config={inputProps} />

        <MeetingTitle onPressLabel={onPressLabel} />
        <CalendarBox />
      </KeyboardAvoidingView>
      <OverlayCalendar visible={visible} onPressLabel={onPressLabel} />
    </>
  );
}

function MeetingTitle({ onPressLabel }: MeetingTitleProps) {
  const styles = useStyles();

  return (
    <Pressable style={styles.labelContainer} onPress={onPressLabel}>
      <Label>모임기간</Label>
      <Label style={styles.subLabelStyle}>기간선택</Label>
    </Pressable>
  );
}

function OverlayCalendar({ visible, onPressLabel }: OverayCalendarProps) {
  const styles = useStyles();

  return (
    <Overlay
      overlayStyle={styles.overlayStyle}
      isVisible={visible}
      onBackdropPress={onPressLabel}
    >
      <View style={styles.calendarViewStyle}>
        <Calendar type="PERIOD" data={undefined} />
      </View>
    </Overlay>
  );
}

function CalendarBox() {
  const styles = useStyles();

  return (
    <View style={styles.calendarContainer}>
      <Calendar type="PERIOD" data={undefined} />
    </View>
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
