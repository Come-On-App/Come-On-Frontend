import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/base';

import { BoldFont } from '../Font';

export default function MyPageHeaderTitle() {
  const styles = useStyles();
  const TITLE = '마이페이지';

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
