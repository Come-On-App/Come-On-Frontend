import React from 'react';
import Font from '@shared/components/font/Font';

import useStyles from './style';
import { Ititle } from './type';

/**
 * 모임 게시물 카드 하단 타이틀 컴포넌트
 */
export default function Title({ text }: Ititle) {
  const { titleFont } = useStyles();

  return (
    <Font bold style={titleFont}>
      {text}
    </Font>
  );
}
