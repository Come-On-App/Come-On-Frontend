import React from 'react';
import { View } from 'react-native';
import InputText from './InputText';
import InputImage from './InputImage';

import { InputFormProps } from '../../types';

function InputForm({ inputProps1 }: InputFormProps) {
  return (
    <View style={{ flex: 1 }}>
      <InputImage />
      <InputText inputProps={inputProps1} />
    </View>
  );
}

export default InputForm;
