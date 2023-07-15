import { ScrollView } from 'react-native';
import React, { useState } from 'react';

import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
import MeetingNameInput from '@post/components/creation/meetingNameInput/MeetingNameInput';
import Uploader from '@post/components/creation/uploader/Uploader';
import VotingTimeRangePicker from '@post/components/creation/votingTimeRangePicker/VotingTimeRangePicker';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import TestId from '@shared/constants/testIds';
import _ from 'lodash/fp';
import { postCreatorPayload } from '@post/components/creation/uploader/payload';

export default function MeetingPostCreator() {
  const [isDisabled, setReady] = useState(true);

  postCreatorPayload.observe((payload) => {
    const isReadySubmit = _.some(_.isEmpty, _.values(payload));

    setReady(isReadySubmit);
  }, 'post_observe_isReadySubmit');

  return (
    <ScrollView testID={TestId.post.creator} bounces={false}>
      <Uploader />
      <MeetingNameInput />
      <VotingTimeRangePicker />
      <DividerWrapper>
        <ScreenLayout>
          <ConfirmCancelButton
            rightDisabled={isDisabled}
            onCancelHandler={() => null}
            onConfirmlHandler={() => null}
          />
        </ScreenLayout>
      </DividerWrapper>
    </ScrollView>
  );
}
