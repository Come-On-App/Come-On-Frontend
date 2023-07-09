import { View } from 'react-native';
import React from 'react';
import _ from 'lodash';

import Field from './field/Field';
import { Icode } from './type';
import useStyles from './style';

export default function Code({ value = '' }: Icode) {
  const { container } = useStyles();

  return (
    <View style={container}>
      {[...value].map((eachCode) => (
        <Field code={eachCode} key={_.uniqueId(eachCode)} />
      ))}
    </View>
  );
}
