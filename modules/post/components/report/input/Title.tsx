import React from 'react';

import PostInput from '@post/components/postInput/PostInput';
import { OnChangeText } from '@shared/components/input/type';

const TITLE = '신고 제목';
const PLACEHOLDER = '제목을 입력해 주세요.';
const LENGTH_MAX = 20;

export default function Title({ onInput }: { onInput: OnChangeText }) {
  return (
    <PostInput
      title={TITLE}
      placeholder={PLACEHOLDER}
      lengthMax={LENGTH_MAX}
      onInput={onInput}
    />
  );
}
