import React from 'react';
import { makeStyles } from '@rneui/themed';
import { TextProps } from '../../types';
import Font from '../StyledText';

function Label({ children, style }: TextProps) {
  const styles = useStyles();

  return <Font style={[styles.label, style]}>{children}</Font>;
}

export default Label;

const useStyles = makeStyles(theme => ({
  label: {
    color: theme.grayscale?.[900],
    fontSize: theme.textStyles?.title4?.fontSize,
    lineHeight: theme.textStyles?.title4?.lineHeight,
    fontWeight: 'bold',
  },
}));
