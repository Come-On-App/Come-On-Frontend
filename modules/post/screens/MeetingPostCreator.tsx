import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { vigilAsync } from 'promise-vigilant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
import MeetingNameInput from '@post/components/creation/meetingNameInput/MeetingNameInput';
import Uploader from '@post/components/creation/uploader/Uploader';
import VotingTimeRangePicker from '@post/components/creation/votingTimeRangePicker/VotingTimeRangePicker';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import TestId from '@shared/constants/testIds';
import { postCreatorPayload } from '@post/payload/creatorPayload';
import { requestCreateMeetings, requestImageUpload } from '@post/api/v1';
import { postListNavigationProps } from '@post/navigation/type';
import { isMeetingFormValid } from '@shared/utils';
import { QueryKeys } from '@app/api/type';

const OVERWRITE = true;
const CONFIRM_TEXT = '모임 만들기';
const LOADING_TEXT = '모임 생성중...';

export default function MeetingPostCreator() {
  const queryClient = useQueryClient();
  const [isDisabled, setDisabled] = useState(true);
  const navigation = useNavigation<postListNavigationProps>();
  const { mutate, status } = useMutation({
    mutationFn: requestCreateMeetings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.meetings] });
      navigation.reset({
        index: 0,
        routes: [{ name: 'MeetingPostList' }],
      });
    },
  });

  useEffect(() => {
    postCreatorPayload.observe(
      (payload) => setDisabled(!isMeetingFormValid(payload)),
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
            onCancelHandler={() => navigation.goBack()}
            onConfirmlHandler={() => {
              const {
                meetingImage,
                meetingName,
                meetingDateRange: { startFrom, endTo },
              } = postCreatorPayload.get();

              if (!startFrom || meetingImage == null) {
                throw new Error('Required properties not passed.');
              }

              // 이미지 변환후 모임 생성
              vigilAsync([
                meetingImage,
                requestImageUpload,
                (imageUrl: string) =>
                  mutate({
                    meetingName,
                    meetingImageUrl: imageUrl,
                    calendarStartFrom: startFrom.dateString,
                    calendarEndTo:
                      endTo === null ? startFrom.dateString : endTo.dateString, // 당일 날짜만 존재할 때는 시작 날짜를 넣어준다.
                  }),
              ]);
            }}
            confirmText={status === 'loading' ? LOADING_TEXT : CONFIRM_TEXT}
          />
        </ScreenLayout>
      </DividerWrapper>
    </ScrollView>
  );
}
