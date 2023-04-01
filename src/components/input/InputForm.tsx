import React, { useState, useEffect } from 'react';
import {
  AnimationInputDateProps,
  AnimationViewType,
  IconProps,
  ImageAnimationProps,
  InputTextProps,
} from '@type/index';

import useMeeting from '@hooks/useMeeting';
import { makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { KeyboardAvoidingView, Pressable, View } from 'react-native';
import { BoldFont } from '@components/Font';
import { AnimationInputBox } from './InputText';
import InputImage from './InputImage';
import IconInputBox, { isValid } from './IconInputBox';

function InputForm({ AnimationView }: AnimationViewType) {
  const styles = useStyles();
  const [name, setName] = useState<string>('');
  const { setMyMeetingName } = useMeeting();
  const {
    meetingSelector: { meetingData },
  } = useMeeting();

  function onChangeHandler(text: string) {
    setName(text);
    setMyMeetingName(text);
  }

  const inputProps: InputTextProps = {
    label: '모임이름',
    placeholder: '모임이름을 입력해주세요!',
    maxLength: 30,
    value: name,
    onChangeText: onChangeHandler,
    multiline: false,
  };
  const [date, setDate] = useState({
    condition: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (meetingData.calendarStartFrom !== '')
      setDate({
        condition: meetingData.calendarStartFrom,
        startDate: meetingData.calendarStartFrom,
        endDate: meetingData.calendarEndTo,
      });
  }, [meetingData.calendarEndTo, meetingData.calendarStartFrom]);

  const dates = `${date.startDate} ~ ${date.endDate}`;
  const placeholder = '날짜 범위를 선택해주세요';
  const dateConfig = {
    value: dates,
    placeholder,
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <InputImageWithAinm AnimationView={AnimationView} id="image" />
      <AnimationInputBox
        inputProps={inputProps}
        AnimationView={AnimationView}
      />
      <AnimationInputDate
        AnimationView={AnimationView}
        dateConfig={dateConfig}
      />
    </KeyboardAvoidingView>
  );
}

export function AnimationInputDate({
  AnimationView,
  dateConfig,
}: AnimationInputDateProps) {
  const styles = useStyles();
  const navigation = useNavigation();
  const onPressLabel = () => {
    navigation.navigate('PeriodCalendar');
  };
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const {
    meetingSelector: { meetingData },
  } = useMeeting();
  const iconConfig: IconProps = {
    name: 'calendar-today',
    size: 24,
    color: styles.iconColor.color,
  };

  useEffect(() => {
    setDate({
      startDate: meetingData.calendarStartFrom,
      endDate: meetingData.calendarEndTo,
    });
  }, [meetingData.calendarEndTo, meetingData.calendarStartFrom]);

  return (
    <View style={styles.inputContainer}>
      <BoldFont style={styles.title}>투표 기간</BoldFont>
      <AnimationView id="date">
        <Pressable
          style={styles.inputBoxHeight}
          onPress={
            dateConfig.onPressHandler ? dateConfig.onPressHandler : onPressLabel
          }
        >
          <IconInputBox
            iconConfig={iconConfig}
            condition={isValid(meetingData.calendarStartFrom)}
            value={dateConfig.value}
            placeholder={dateConfig.placeholder}
          />
        </Pressable>
      </AnimationView>
    </View>
  );
}

export function InputImageWithAinm({ AnimationView, id }: ImageAnimationProps) {
  return (
    <AnimationView id={id}>
      <InputImage />
    </AnimationView>
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
  inputBoxHeight: {
    height: 48,
    marginTop: 12,
  },
  iconColor: {
    color: theme.grayscale['500'],
  },
}));
