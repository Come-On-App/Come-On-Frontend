import React from 'react';
import Font from '@shared/components/font/Font';

import useStyles from './style';
import { ITitle } from './type';

/**
 * 카드 하단 타이틀 컴포넌트
 */
export default function Title({ text }: ITitle) {
  const { titleFont } = useStyles();

  return (
    <Font bold style={titleFont}>
      {text}
    </Font>
  );
}
