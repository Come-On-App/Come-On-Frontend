import React from 'react';

import PostInput from '@post/components/postInput/PostInput';
import { OnChangeText } from '@shared/components/input/type';

const TITLE = '신고 내용';
const PLACEHOLDER = '내용을 작성해 주세요.';
const MESSAGE = '신고가 접수되면 자동으로 모임에서 제외됩니다.';
const LENGTH_MAX = 150;

export default function Content({
  onInput,
  hasChanged,
}: {
  onInput: OnChangeText;
  hasChanged: boolean;
}) {
  return (
    <PostInput
      multiline
      title={TITLE}
      lengthMax={LENGTH_MAX}
      onInput={onInput}
      placeholder={PLACEHOLDER}
      inputStyle={{ alignSelf: 'flex-start' }}
      errorMessage={hasChanged ? undefined : MESSAGE}
    />
  );
}
