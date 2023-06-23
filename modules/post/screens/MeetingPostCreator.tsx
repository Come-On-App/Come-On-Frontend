import React from 'react';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';
import MeetingNameInput from '@post/components/creation/meetingNameInput/MeetingNameInput';
import Uploader from '@post/components/creation/uploader/Uploader';
import VotingTimeRangePicker from '@post/components/creation/votingTimeRangePicker/VotingTimeRangePicker';
import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';

export default function MeetingPostCreator() {
  return (
    <View testID={TestId.post.creator}>
      <Uploader />
      <MeetingNameInput />
      <VotingTimeRangePicker />
      <ConfirmCancelButton
        onCancelHandler={() => null}
        onConfirmlHandler={() => null}
      />
    </View>
  );
}
