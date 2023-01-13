import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Pressable } from 'react-native';
import { makeStyles, Overlay } from '@rneui/themed';

import InputText from './InputText';
import InputImage from './InputImage';
import LocaleConfig from '../calendar/LocaleConfig';
import { InputFormProps } from '../../types';
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
        <InputText inputProps={inputProps} />
        <Pressable style={styles.labelContainer} onPress={onPressLabel}>
          <Label>모임기간</Label>
          <Label style={styles.subLabelStyle}>기간선택</Label>
        </Pressable>
        <View style={styles.calendarContainer}>
          <Calendar type="PERIOD" data={undefined} />
        </View>
      </KeyboardAvoidingView>
      <Overlay
        overlayStyle={{
          width: '90%',
          margin: 0,
          padding: 0,
          backgroundColor: 'rgba(52, 52, 52, 0)',
        }}
        isVisible={visible}
        onBackdropPress={onPressLabel}
      >
        <View style={{ width: '100%', height: 700 }}>
          <Calendar type="PERIOD" data={undefined} />
        </View>
      </Overlay>
    </>
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
