import React from 'react';
import { ScrollView } from 'react-native';

import TestId from '@shared/constants/testIds';
import MeetingNameInput from '@post/components/creation/meetingNameInput/MeetingNameInput';
import Uploader from '@post/components/creation/uploader/Uploader';
import VotingTimeRangePicker from '@post/components/creation/votingTimeRangePicker/VotingTimeRangePicker';
import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
import DividerWrapper from '@shared/components/layout/DividerWrapper';

export default function MeetingPostCreator() {
  return (
    <ScrollView testID={TestId.post.creator} bounces={false}>
      <Uploader />
      <MeetingNameInput />
      <VotingTimeRangePicker />
      <DividerWrapper>
        <ConfirmCancelButton
          onCancelHandler={() => null}
          onConfirmlHandler={() => null}
        />
      </DividerWrapper>
    </ScrollView>
  );
}
