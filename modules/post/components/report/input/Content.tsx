import React from 'react';

import PostInput from '@post/components/postInput/PostInput';
import { IContent } from './type';

const TITLE = '신고 내용';
const PLACEHOLDER = '내용을 작성해 주세요.';
const MESSAGE = '신고가 접수되면 자동으로 모임에서 제외됩니다.';
const LENGTH_MAX = 150;

export default function Content({
  onInput,
  hasChanged,
  onFocus,
  onLayout,
}: IContent) {
  return (
    <PostInput
      onLayout={(event) => onLayout(event, TITLE)}
      onFocus={() => onFocus(TITLE)}
      multiline
      title={TITLE}
      lengthMax={LENGTH_MAX}
      onInput={onInput}
      placeholder={PLACEHOLDER}
      errorMessage={hasChanged ? undefined : MESSAGE}
    />
  );
}
