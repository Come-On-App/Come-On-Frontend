import { View } from 'react-native';
import React from 'react';

import Button from '@shared/components/button/Button';
import useStyles from './style';

const TITLE = '모임 등록하러 가기';

export default function CreationButton() {
  const { container } = useStyles();

  return (
    <View style={container}>
      <Button
        bold
        title={TITLE}
        onPress={() => console.log('CreationButton')}
      />
    </View>
  );
}
