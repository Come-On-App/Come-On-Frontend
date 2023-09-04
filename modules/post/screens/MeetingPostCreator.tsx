import { Keyboard, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { asyncWave } from 'async-wave';

import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import Uploader from '@post/components/creation/uploader/Uploader';
import VotingTimeRangePicker from '@post/components/creation/votingTimeRangePicker/VotingTimeRangePicker';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import TestId from '@shared/constants/testIds';
import { requestCreateMeetings, requestImageURL } from '@post/api/v1';
import { PostNativeStack } from '@post/navigation/type';
import { isPostFormValid } from '@shared/utils';
import { QueryKey } from '@app/api/type';
import MeetingNameInput from '@post/components/creation/meetingName/MeetingName';
import usePostManagement from '@post/hooks/usePostManagement';
import type { ValidatedPostState, PostState } from '@post/features/post/type';
import { PostMeetingPayload } from '@post/api/v1/type';
import { invalidateQueries } from '@app/api/queryClient';

const CONFIRM_TEXT = '모임 만들기';
const LOADING_TEXT = '모임 생성중...';

export default function MeetingPostCreator({
  navigation,
}: PostNativeStack<'MeetingPostCreation'>) {
  const { initPostState, postState } = usePostManagement();
  const { mutate, isLoading } = useMutation(requestCreateMeetings, {
    onSuccess: () => {
      invalidateQueries([QueryKey.post, QueryKey.list]);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MeetingPostList' }],
      });
    },
  });

  useEffect(() => {
    return () => {
      initPostState();
    };
  }, [initPostState]);

  return (
    <ScrollView
      testID={TestId.post.creator}
      bounces={false}
      keyboardShouldPersistTaps="handled"
    >
      <Uploader />
      <MeetingNameInput />
      <VotingTimeRangePicker />
      <DividerWrapper>
        <ScreenLayout>
          <ConfirmCancelButton
            leftDisabled={isLoading}
            rightDisabled={!isPostFormValid(postState) || isLoading}
            onPressLeft={() => navigation.goBack()}
            confirmText={isLoading ? LOADING_TEXT : CONFIRM_TEXT}
            onPressRight={() => {
              asyncWave([
                Keyboard.dismiss,
                () => generatePostPayload(postState),
                mutate,
              ]);
            }}
          />
        </ScreenLayout>
      </DividerWrapper>
    </ScrollView>
  );
}

/**
 * [헬퍼 함수]
 * 객체의 유효성 체크를 진행한다.
 */
function validatePostState({
  image,
  dateRange,
  name,
}: PostState): ValidatedPostState {
  if (dateRange.startingDay === null || image.asset === null || name === null) {
    throw new Error('Required properties not passed.');
  }

  return {
    name,
    dateRange: {
      startingDay: dateRange.startingDay,
      endingDay: null,
    },
    image: {
      asset: image.asset,
    },
  };
}

/**
 * [헬퍼 함수]
 * 서버에 요청할 올바른 페이로드 객체를 반환한다.
 *
 * - 이미지 객체가 존재한다면 이미지 변환 API를 요청한다.
 */
const generatePostPayload = async (
  postState: PostState,
): Promise<PostMeetingPayload> => {
  const {
    dateRange: { startingDay, endingDay },
    image,
    name,
  } = validatePostState(postState);

  return {
    meetingName: name,
    meetingImageUrl: await requestImageURL(image.asset),
    calendarStartFrom: startingDay.dateString,
    calendarEndTo:
      endingDay === null ? startingDay.dateString : endingDay.dateString, // 당일 날짜만 존재할 때는 시작 날짜를 넣어준다.
  };
};
