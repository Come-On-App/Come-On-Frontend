import React from 'react';

import { postModifierPayload } from '@post/payload/postPayload';
import MeetingNameInput from '@post/components/meetingNameInput/MeetingNameInput';
import { ImeetingName } from './type';

const TITLE = '모임 수정';
const PLACEHOLDER = '이전 게시물 제목 로드 중...';
const LENGTH_MAX = 20;

export default function MeetingName({ meetingName, isLoad }: ImeetingName) {
  return (
    <MeetingNameInput
      isLoad={isLoad}
      prevMeetingName={meetingName}
      title={TITLE}
      placeholder={meetingName ?? PLACEHOLDER}
      lengthMax={LENGTH_MAX}
      onInput={(input) =>
        postModifierPayload.update(() => ({
          meetingName: input,
        }))
      }
    />
  );
}
