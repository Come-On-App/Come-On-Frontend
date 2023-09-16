import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import { ContentField } from './type';
import useStyles from './style';

export default function Note({ content }: ContentField) {
  const { noteContainer } = useStyles();

  return (
    <View style={noteContainer}>
      <Font>{content}</Font>
    </View>
  );
}
