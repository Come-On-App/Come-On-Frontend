import { View } from 'react-native';
import React from 'react';
import Font from '@shared/components/font/Font';
import useStyles from './style';

export default function Message({ text }: { text: string }) {
  const { titleFont } = useStyles();

  return (
    <View>
      <Font style={titleFont} bold>
        {text}
      </Font>
    </View>
  );
}
