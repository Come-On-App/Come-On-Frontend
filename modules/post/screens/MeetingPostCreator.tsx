import { ScrollView } from 'react-native';
import React from 'react';

import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
import MeetingNameInput from '@post/components/creation/meetingNameInput/MeetingNameInput';
import Uploader from '@post/components/creation/uploader/Uploader';
import VotingTimeRangePicker from '@post/components/creation/votingTimeRangePicker/VotingTimeRangePicker';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import TestId from '@shared/constants/testIds';

export default function MeetingPostCreator() {
  return (
    <ScrollView testID={TestId.post.creator} bounces={false}>
      <Uploader />
      <MeetingNameInput />
      <VotingTimeRangePicker />
      <DividerWrapper>
        <ScreenLayout>
          <ConfirmCancelButton
            onCancelHandler={() => null}
            onConfirmlHandler={() => null}
          />
        </ScreenLayout>
      </DividerWrapper>
    </ScrollView>
  );
}
