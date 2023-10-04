import React, { useState } from 'react';

import Description from '@connection/components/description/CodeDescription';
import EntranceInput from '@connection/components/entranceInput/EntranceInput';
import CodeEntryButton from '@connection/components/button/CodeEntryButton';
import { EMPTY_STRING } from '@shared/utils';
import useRestrictNavigation from '@shared/hooks/useRestrictNavigation';
import { Status } from './type';

export default function MeetingJoinForm() {
  const [code, setCode] = useState(EMPTY_STRING);
  const [meetingJoinStatus, setJoinStatus] = useState<Status>({
    isError: false,
    isLoading: false,
    errorMessage: EMPTY_STRING,
  });

  useRestrictNavigation(meetingJoinStatus.isLoading);

  return (
    <>
      <Description joinStatus={meetingJoinStatus} />
      <EntranceInput code={code} dispatch={setCode} />
      <CodeEntryButton
        code={code}
        dispatch={setJoinStatus}
        codeDispatch={setCode}
      />
    </>
  );
}
