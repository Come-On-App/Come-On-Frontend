import React from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import FieldContent from './FieldContent';
import { IFieldDisplay } from './type';

export default function FieldDisplay({ field }: IFieldDisplay) {
  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{field.label}</ScreenTitle>
        </ContentHeader>
        <FieldContent content={field.content} type={field.fieldType} />
      </ScreenLayout>
    </DividerWrapper>
  );
}
