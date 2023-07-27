import React from 'react';

import { postCreatorPayload } from '@post/payload/postPayload';
import MeetingNameInput from '@post/components/meetingNameInput/MeetingNameInput';

const TITLE = '모임 이름';
const PLACEHOLDER = '여기로 모여!';
const LENGTH_MAX = 20;

export default function MeetingName() {
  return (
    <MeetingNameInput
      title={TITLE}
      placeholder={PLACEHOLDER}
      lengthMax={LENGTH_MAX}
      onInput={(input) =>
        postCreatorPayload.update(() => ({
          meetingName: input,
        }))
      }
    />
  );
}
