import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import { BoldFont } from '@components/Font';

export default function PlaceSelectHeaderTitle() {
  const TITLE = '장소선택';
  const styles = useStyles();

  return (
    <View>
      <BoldFont style={styles.titleText}>{TITLE}</BoldFont>
    </View>
  );
}

const useStyles = makeStyles(() => ({
  titleText: {
    fontSize: 16,
  },
}));
