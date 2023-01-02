import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import InputText from './InputText';
import InputImage from './InputImage';

import { InputFormProps } from '../../types';

function InputForm({ inputProps }: InputFormProps) {
  const styles = useStyles();

  return (
    <View style={styles.contianer}>
      <InputImage />
      <InputText inputProps={inputProps} />
    </View>
  );
}

export default InputForm;

const useStyles = makeStyles(() => ({
  contianer: {
    flex: 1,
  },
}));
