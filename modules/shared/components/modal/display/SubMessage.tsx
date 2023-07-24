import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';

export default function SubMessage({ text }: { text: string }) {
  const { subTitleFont } = useStyles();

  return <Font style={subTitleFont}>{text}</Font>;
}
