import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import InputBox from './InputText';
import InputImage from './InputImage';

import type { InputFormProps } from '../../types';

function InputForm({ inputProps }: InputFormProps) {
  const styles = useStyles();

  return (
    <View style={styles.contianer}>
      <InputImage />
      <InputBox config={inputProps} />
    </View>
  );
}

export default InputForm;

const useStyles = makeStyles(() => ({
  contianer: {
    flex: 1,
  },
}));
