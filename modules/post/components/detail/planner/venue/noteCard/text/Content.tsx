import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';

export default function Content({ text }: { text: string }) {
  const { contentFont } = useStyles();

  return <Font style={contentFont}>{text}</Font>;
}
