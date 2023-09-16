import React from 'react';

import Font from '@shared/components/font/Font';
import { checkFieldType } from '@post/components/detail/planner/customField/field/util/inputFieldUtils';
import Note from './Note';
import Tel from './Tel';
import CustomLink from './CustomLink';
import { IFieldContent } from './type';

export default function FieldContent({ content, type }: IFieldContent) {
  const { isMultiline, isLinkType, isTelType } = checkFieldType(type);

  if (isMultiline) {
    return <Note content={content} />;
  }

  if (isTelType) {
    return <Tel content={content} />;
  }

  if (isLinkType) {
    return <CustomLink content={content} />;
  }

  return <Font numberOfLines={1}>{content}</Font>;
}
