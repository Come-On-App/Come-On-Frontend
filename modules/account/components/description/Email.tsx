import React from 'react';

import Font from '@shared/components/font/Font';
import { useQueryDataByUser } from '@account/hooks/useMyInfoQuery';
import useStyles from './style';

const EMPTY = ' ';

export default function Email() {
  const { emailFont } = useStyles();
  const userQueryData = useQueryDataByUser();

  return <Font style={emailFont}>{userQueryData?.email ?? EMPTY}</Font>;
}
