import React from 'react';

import Font from '@shared/components/font/Font';
import useStyles from './style';
import { Imessage } from './type';

export default function SubMessage({ text, customStyle }: Imessage) {
  const { subTitleFont } = useStyles();

  return <Font style={[subTitleFont, customStyle]}>{text}</Font>;
}
