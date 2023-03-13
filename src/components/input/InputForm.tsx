import React, { useState } from 'react';
import {
  AnimationViewType,
  IconProps,
  ImageAnimationProps,
  InputTextProps,
} from '@type/index';

import useMeeting from '@hooks/useMeeting';
import { makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { View, KeyboardAvoidingView, Pressable } from 'react-native';

import Font from '../Font';
import InputImage from './InputImage';
import IconInputBox, { isValid } from './IconInputBox';
import { AnimationInputBox } from './InputText';

function InputForm({ AnimationView }: AnimationViewType) {
  const styles = useStyles();
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const { meetingData, setMyMeetingName } = useMeeting();
  const dates = `${meetingData.calendarStartFrom} ~ ${meetingData.calendarEndTo}`;
  const placeholder = '날짜 범위를 선택해주세요';
  const iconConfig: IconProps = {
    name: 'calendar-today',
    size: 24,
    color: styles.iconColor.color,
  };

  function onChangeHandler(text: string) {
    setName(text);
    setMyMeetingName(text);
  }

  const onPressLabel = () => {
    navigation.navigate('CreateMeetingCalender');
  };
  const inputProps: InputTextProps = {
    label: '모임이름',
    placeholder: '모임이름을 입력해주세요!',
    maxLength: 30,
    value: name,
    onChangeText: onChangeHandler,
    multiline: false,
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <InputImgaeWithAinm AnimationView={AnimationView} id="image" />
      <AnimationInputBox
        inputProps={inputProps}
        AnimationView={AnimationView}
      />
      <View style={styles.inputContainer}>
        <Font style={styles.title}>모임 캘린더</Font>
        <AnimationView id="date">
          <Pressable style={styles.inputContainer} onPress={onPressLabel}>
            <IconInputBox
              iconConfig={iconConfig}
              condition={isValid(meetingData.calendarStartFrom)}
              value={dates}
              placeholder={placeholder}
            />
          </Pressable>
        </AnimationView>
      </View>
    </KeyboardAvoidingView>
  );
}

export function InputImgaeWithAinm({ AnimationView, id }: ImageAnimationProps) {
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
  iconColor: {
    color: theme.grayscale['500'],
  },
}));
