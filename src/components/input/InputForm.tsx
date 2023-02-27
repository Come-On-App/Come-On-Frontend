import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Pressable } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import useMeeting from '@hooks/useMeeting';
import { useAppDispatch } from '@app/hooks';
import { setMeetingName } from '@features/meetingSlice';
import {
  AnimationViewType,
  IconProps,
  InputFormAnimProps,
  InputTextProps,
} from '@type/index';
import { InputBoxMain, InputBoxTop } from './InputText';
import InputImage from './InputImage';
import Font from '../Font';
import IconInputBox, { isValid } from './IconInputBox';

function AnimationInputBox({ inputProps, AnimationView }: InputFormAnimProps) {
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
        />
      </AnimationView>
    </View>
  );
}

function InputForm({ AnimationView }: AnimationViewType) {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { meetingData } = useMeeting();
  const navigation = useNavigation();
  const placeholder = '날짜 범위를 선택해주세요';
  const value = `${meetingData.calendarStartFrom} ~ ${meetingData.calendarEndTo}`;
  const iconConfig: IconProps = {
    name: 'calendar-today',
    size: 24,
    color: styles.iconColor.color,
  };
  const onPressLabel = () => {
    navigation.navigate('CreateMeetingCalender');
  };
  const onChangeHandler = (text: string) => {
    setName(text);
    dispatch(setMeetingName(text));
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
      <AnimationView id="image">
        <InputImage />
      </AnimationView>
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
              value={value}
              placeholder={placeholder}
            />
          </Pressable>
        </AnimationView>
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
  inputBoxStyle: {
    textAlignVertical: 'center',
  },
  iconColor: {
    color: theme.grayscale['500'],
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
