import { makeStyles } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

export default function Map() {
  const styles = useStyles();

  return <View style={styles.map} />;
}

const useStyles = makeStyles(theme => ({
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
  },
}));
