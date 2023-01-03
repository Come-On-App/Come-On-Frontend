import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import Font from '../Font';
import { TextProps } from '../../types';

function PlaceNumber({ children }: TextProps) {
  const styles = useStyles();

  return (
    <View style={styles.numberContainer}>
      <Font style={styles.numbering}>{children}</Font>
    </View>
  );
}

export default PlaceNumber;

const useStyles = makeStyles(theme => ({
  numberContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbering: {
    width: 22,
    height: 22,
    zIndex: 100,
    color: 'white',
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    padding: 'auto',
  },
}));
