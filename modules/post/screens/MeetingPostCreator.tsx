import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
import MeetingNameInput from '@post/components/creation/meetingNameInput/MeetingNameInput';
import Uploader from '@post/components/creation/uploader/Uploader';
import VotingTimeRangePicker from '@post/components/creation/votingTimeRangePicker/VotingTimeRangePicker';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import TestId from '@shared/constants/testIds';
import {
  MeetingDateRange,
  postCreatorPayload,
} from '@post/payload/creatorPayload';

const OVERWRITE = true;

export default function MeetingPostCreator() {
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    postCreatorPayload.observe(
      (payload) => {
        setDisabled(!checkMeetingData(payload));
      },
      'post_observe_isReadySubmit',
      OVERWRITE,
    );

    return () => {
      postCreatorPayload.init();
    };
  }, []);

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

// 날짜 확인 유틸 함수
function checkMeetingData({
  meetingImage,
  meetingName,
  meetingDateRange,
}: {
  meetingImage: string;
  meetingName: string;
  meetingDateRange: MeetingDateRange;
}) {
  // 모든 속성 값이 존재하는지 확인
  const hasImage = meetingImage.length > 0;
  const hasName = meetingName.length > 0;
  const hasDateRange =
    meetingDateRange !== null &&
    (meetingDateRange.startFrom || meetingDateRange.endTo);

  // 모든 속성 값이 존재하는지 여부를 반환
  return hasImage && hasName && hasDateRange;
}
