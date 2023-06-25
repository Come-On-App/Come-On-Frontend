import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';

export default function Title({ text }: { text: string }) {
  const { titleFont } = useStyles();

  return (
    <Font bold style={titleFont} numberOfLines={1}>
      {text}
    </Font>
  );
}
