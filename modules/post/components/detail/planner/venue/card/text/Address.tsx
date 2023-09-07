import React from 'react';
import Font from '@shared/components/font/Font';
import useStyles from './style';

export default function Address({ text }: { text: string }) {
  const { addressFont } = useStyles();

  return (
    <Font style={addressFont} numberOfLines={1}>
      {text}
    </Font>
  );
}
