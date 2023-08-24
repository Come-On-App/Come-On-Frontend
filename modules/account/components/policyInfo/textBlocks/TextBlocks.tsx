import { View } from 'react-native';
import React, { ReactNode } from 'react';
import Font from '@shared/components/font/Font';
import { applyRelativeSizes } from '@shared/utils';
import ContentHeader from '@shared/components/layout/ContentHeader';

interface Props {
  children: ReactNode;
}

const [
  TITLE_FONT,
  SUB_TITLE_FONT,
  PARAGRAPH_MARGIN_VERTICAL,
  CONTENT_MARGIN_VERTICAL,
] = applyRelativeSizes({
  titleFontSize: 18,
  subTitleFontSize: 16,
  paragraphMarginVertical: 10,
  contentMarginVertical: 5,
});

export function Title({ children }: Props) {
  return (
    <ContentHeader>
      <Font bold style={{ fontSize: TITLE_FONT }}>
        {children}
      </Font>
    </ContentHeader>
  );
}

export function SubTitle({ children }: Props) {
  return (
    <Font bold style={{ fontSize: SUB_TITLE_FONT }}>
      {children}
    </Font>
  );
}

export function Paragraph({ children }: Props) {
  return (
    <View style={{ marginVertical: PARAGRAPH_MARGIN_VERTICAL }}>
      {children}
    </View>
  );
}

export function Content({ children }: Props) {
  return (
    <Font style={{ marginVertical: CONTENT_MARGIN_VERTICAL }}>{children}</Font>
  );
}
