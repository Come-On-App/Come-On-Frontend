import React from 'react';
import { View } from 'react-native';

import Font from '@shared/components/font/Font';
import useStyles from '../customField/fieldList/style';

const EMPTY_TEXT = '등록된 필드가 없습니다.';

export default function EmptyTextField() {
  const { emptyFont, emptyFontContainer } = useStyles();

  return (
    <View style={emptyFontContainer}>
      <Font style={emptyFont}>{EMPTY_TEXT}</Font>
    </View>
  );
}
