import React from 'react';

import PostInput from '@post/components/postInput/PostInput';
import { OnChangeText } from '@shared/components/input/type';

const TITLE = '신고 내용';
const PLACEHOLDER = '신고가 접수되면 자동으로 모임에서 제외됩니다.';
const LENGTH_MAX = 150;

export default function Content({ onInput }: { onInput: OnChangeText }) {
  return (
    <PostInput
      multiline
      title={TITLE}
      placeholder={PLACEHOLDER}
      lengthMax={LENGTH_MAX}
      onInput={onInput}
    />
  );
}
