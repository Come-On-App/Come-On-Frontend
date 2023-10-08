import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { asyncWave } from 'async-wave';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import Uploader from '@post/components/creation/uploader/Uploader';
import VotingTimeRangePicker from '@post/components/creation/votingTimeRangePicker/VotingTimeRangePicker';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import TestId from '@shared/constants/testIds';
import { requestCreateMeetings, requestImageURL } from '@post/api/v1';
import { PostNativeStack } from '@post/navigation/type';
import { isPostFormValid } from '@shared/utils';
import MeetingNameInput from '@post/components/creation/meetingName/MeetingName';
import usePostManagement from '@post/hooks/usePostManagement';
import type { ValidatedPostState, PostState } from '@post/features/post/type';
import { PostMeetingPayload } from '@post/api/v1/type';
import { invalidateQueries } from '@app/api/queryClient';
import { QueryKey } from '@app/api/type';
import useRestrictNavigation from '@shared/hooks/useRestrictNavigation';
import { hapticSuccess } from '@shared/utils/haptics';

const CONFIRM_TEXT = '모임 만들기';
const LOADING_TEXT = '모임 생성중...';
const TOAST_CONFIG = {
  type: 'success',
  text1: '새로운 모임을 성공적으로 만들었습니다 🎉',
  text2: '다른 사람들을 초대하여 모임을 진행하세요! 👋',
};
const TOAST_CONFIG_ERROR = {
  type: 'error',
  text1: '모임 생성에 실패하였습니다.',
  text2: '서버 오류가 발생하였습니다 다시 생성해 주세요',
};

export default function MeetingPostCreator({
  navigation,
}: PostNativeStack<'MeetingPostCreation'>) {
  const [isLoading, setLoading] = useState(false);
  const { initPostState, postState } = usePostManagement();
  const { mutate } = useMutation(requestCreateMeetings, {
    onSuccess: () => {
      hapticSuccess();
      Toast.show(TOAST_CONFIG);
      invalidateQueries([QueryKey.post, QueryKey.list]);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MeetingPostList' }],
      });
    },
    onError: () => {
      setLoading(false);
      Toast.show(TOAST_CONFIG_ERROR);
    },
  });

  useEffect(() => {
    return () => {
      initPostState();
    };
  }, [initPostState]);

  useRestrictNavigation(isLoading);

  return (
    <SafeAreaView edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })}>
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
                    setLoading(true),
                    Keyboard.dismiss,
                    () => generatePostPayload(postState),
                    mutate,
                  ]);
                }}
              />
            </ScreenLayout>
          </DividerWrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
      endingDay: dateRange.endingDay,
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
