import React from 'react';

import Font from '@shared/components/font/Font';
import { Iemail } from './type';
import useStyles from './style';

export default function Email({ email }: Iemail) {
  const { emailFont } = useStyles();

  return <Font style={emailFont}>{email}</Font>;
}
