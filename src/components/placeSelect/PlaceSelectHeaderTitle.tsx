import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/base';

import { BoldFont } from '../Font';

export default function PlaceSelectHeaderTitle() {
  const styles = useStyles();
  const TITLE = '장소선택';

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
