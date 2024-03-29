import React from 'react';

import PostInput from '@post/components/postInput/PostInput';
import usePostManagement from '@post/hooks/usePostManagement';

const TITLE = '모임 이름';
const PLACEHOLDER = '여기로 모여!';
const LENGTH_MAX = 20;

export default function MeetingName() {
  const { dispatchName } = usePostManagement();

  return (
    <PostInput
      title={TITLE}
      placeholder={PLACEHOLDER}
      lengthMax={LENGTH_MAX}
      onInput={dispatchName}
    />
  );
}
