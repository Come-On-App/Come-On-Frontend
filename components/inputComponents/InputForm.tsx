import React from 'react';
import { View } from '../Themed';
import InputText from './InputText';
import InputImage from './InputImage';

import { InputFormProps } from '../../types';

function InputForm({ inputProps1, inputProps2 }: InputFormProps) {
  return (
    <View>
      <InputImage />
      <InputText inputProps={inputProps1} />
      <InputText inputProps={inputProps2} />
    </View>
  );
}

export default InputForm;
