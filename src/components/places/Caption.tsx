import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { TextProps } from '../../types';
import { Font } from '../Font';

function Caption({ children }: TextProps) {
  const styles = useStyles();

  return (
    <View style={styles.captionContainer}>
      <Font style={styles.caption}>{children}</Font>
    </View>
  );
}

export default Caption;

const useStyles = makeStyles(theme => ({
  captionContainer: {
    justifyContent: 'center',
  },
  caption: {
    height: 16,
    borderRadius: 2,
    paddingHorizontal: 3,
    paddingVertical: 1,
    fontSize: theme.textStyles.caption.fontSize,
    lineHeight: theme.textStyles.caption.lineHeight,
    color: theme.grayscale?.[500],
    textAlign: 'center',
    backgroundColor: theme.grayscale?.[200],
    marginBottom: 2,
  },
}));
