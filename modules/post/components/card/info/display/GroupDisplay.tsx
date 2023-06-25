import { View } from 'react-native';
import React from 'react';

import Display from './Display';
import { IGroupDisplay } from './type';

const UNIT = '명';

export default function GroupDisplay({ people }: IGroupDisplay) {
  return (
    <View>
      <Display name="groups">{people + UNIT}</Display>
    </View>
  );
}
