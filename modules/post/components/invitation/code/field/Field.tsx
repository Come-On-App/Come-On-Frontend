import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';
import { Ifield } from './type';

export default function Field({ code }: Ifield) {
  const { fieldContainer, fieldFont } = useStyles();

  return (
    <View style={fieldContainer}>
      <Font bold style={fieldFont}>
        {code}
      </Font>
    </View>
  );
}
