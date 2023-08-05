import React from 'react';

import MeetingNameInput from '@post/components/meetingNameInput/MeetingNameInput';
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
    <MeetingNameInput
      isDataLoading={isDataLoading}
      title={TITLE}
      placeholder={prevMeetingName || PLACEHOLDER}
      lengthMax={LENGTH_MAX}
      onInput={dispatchName}
      prevMeetingName={name}
    />
  );
}
