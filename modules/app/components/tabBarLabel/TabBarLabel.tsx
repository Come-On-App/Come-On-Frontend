import React from 'react';

import Font from '@shared/components/font/Font';
import { relativeSizeConverter } from '@shared/utils';
import { ItabBarLabel } from './type';

export default function createTabBarLabel(labelText: string) {
  return function LabelFont({ color, focused }: ItabBarLabel) {
    return (
      <Font
        bold={focused}
        style={{
          color,
          fontSize: relativeSizeConverter(12),
        }}
      >
        {labelText}
      </Font>
    );
  };
}
