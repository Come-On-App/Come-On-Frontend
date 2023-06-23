import { View } from 'react-native';
import React from 'react';
import Font from '@shared/components/font/Font';
import useStyles from './style';

export default function MemberCount({ headcount }: { headcount: number }) {
  const { font } = useStyles();

  return (
    <View>
      <Font bold style={font}>
        {headcount}
      </Font>
    </View>
  );
}
