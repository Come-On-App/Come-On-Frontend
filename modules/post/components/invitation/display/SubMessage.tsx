import React from 'react';
import Font from '@shared/components/font/Font';
import { relativeSizeConverter } from '@shared/utils/utils';

export default function SubMessage({ text }: { text: string }) {
  return (
    <Font
      style={{
        fontSize: relativeSizeConverter(14),
        color: '#616161',
      }}
    >
      {text}
    </Font>
  );
}
