import React from 'react';
import { makeStyles } from '@rneui/themed';
import { TextProps } from '../../types';
import Font from '../StyledText';

function Label({ children, style }: TextProps) {
  const styles = useStyles();

  return <Font style={[style, styles.label]}>{children}</Font>;
}

export default Label;

const useStyles = makeStyles(theme => ({
  label: {
    fontWeight: 'bold',
  },
}));
