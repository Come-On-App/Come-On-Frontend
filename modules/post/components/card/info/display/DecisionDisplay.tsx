import { View } from 'react-native';
import React from 'react';

import { IDecisionDisplay } from './type';
import Display from './Display';

const CONFIRMED = '확정';
const UN_CONFIRMED = '미확정';

export default function DecisionDisplay({ isDecided }: IDecisionDisplay) {
  return (
    <View>
      <Display name="check-circle" disabled={!isDecided}>
        {isDecided ? CONFIRMED : UN_CONFIRMED}
      </Display>
    </View>
  );
}
