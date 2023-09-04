import React from 'react';

import ScreenLayout from '@shared/components/layout/ScreenLayout';
import Spacer from '@shared/components/layout/Spacer';
import ToggleVoteButton from './ToggleVoteButton';
import { IVoteButton } from './type';
import ConfirmMeetingDateButton from './ConfirmMeetingDateButton';

export default function VoteButton({
  isHost,
  isFixed,
  isShow,
  myVoting,
  fixedDate,
  currentDate,
}: IVoteButton) {
  const isVoteButtonDisabled = isFixed || !isShow;
  const isConfirmButtonDisabled = isFixed ? !isFixed : !isShow;

  return (
    <ScreenLayout>
      <ToggleVoteButton
        myVoting={myVoting}
        fixedDate={fixedDate}
        isFixed={isFixed}
        disabled={isVoteButtonDisabled}
        currentDate={currentDate}
      />
      <Spacer applyRelative height={10} />
      <ConfirmMeetingDateButton
        currentDate={currentDate}
        isFixed={isFixed}
        isHost={isHost}
        disabled={isConfirmButtonDisabled}
      />
    </ScreenLayout>
  );
}
