import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';
import { Imessage } from './type';

export default function Message({ text, customStyle }: Imessage) {
  const { titleFont } = useStyles();

  return (
    <Font style={[titleFont, customStyle]} bold>
      {text}
    </Font>
  );
}
