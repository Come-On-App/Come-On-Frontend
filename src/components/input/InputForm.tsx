import React from 'react';
import { View, KeyboardAvoidingView, Pressable, Text } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Icon from '@components/Icon';
import useMeetings from '@hooks/useMeetings';
import InputBox from './InputText';
import InputImage from './InputImage';
import { IconProps, InputFormProps } from '../../types';
import Font from '../Font';
import IconInputBox, { isValid } from './IconInputBox';

function InputForm({ inputProps }: InputFormProps) {
  const styles = useStyles();
  const { meetingData } = useMeetings();
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

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <InputImage />
      <InputBox config={inputProps} style={styles.inputBoxStyle} />
      <View style={styles.inputContainer}>
        <Font style={styles.title}>모임 캘린더</Font>
        <Pressable style={styles.inputContainer} onPress={onPressLabel}>
          <IconInputBox
            iconConfig={iconConfig}
            condition={isValid(meetingData.calendarStartFrom)}
            value={value}
            placeholder={placeholder}
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
