import React from 'react';

import PostInput from '@post/components/postInput/PostInput';
import usePostManagement from '@post/hooks/usePostManagement';
import { ImeetingName } from './type';

const TITLE = '모임 수정';
const PLACEHOLDER = '이전 게시물 제목 로드 중...';
const LENGTH_MAX = 20;

export default function MeetingName({
  isDataLoading,
  prevMeetingName,
}: ImeetingName) {
  const {
    dispatchName,
    postState: { name },
  } = usePostManagement();

  return (
    <PostInput
      isDataLoading={isDataLoading}
      title={TITLE}
      placeholder={prevMeetingName || PLACEHOLDER}
      lengthMax={LENGTH_MAX}
      onInput={dispatchName}
      prevPayload={name}
    />
  );
}
