import { View } from 'react-native';
import React from 'react';

import DefaultLogo from '@shared/components/logo/Logo';
import useStyles from './style';

export default function Logo() {
  const { container } = useStyles();

  return (
    <View style={container}>
      <DefaultLogo />
    </View>
  );
}
