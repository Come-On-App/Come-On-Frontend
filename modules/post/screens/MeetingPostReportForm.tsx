import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isNull } from 'lodash';
import { asyncWave } from 'async-wave';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Uploader from '@post/components/report/uploader/Uploader';
import Content from '@post/components/report/input/Content';
import Title from '@post/components/report/input/Title';
import TestId from '@shared/constants/testIds';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import useReportManagement, {
  ReportState,
} from '@post/hooks/useReportManagement';
import { theme } from '@shared/constants/themed';
import {
  requestDeleteMeeting,
  requestImageURL,
  requestPostReportMeeting,
} from '@post/api/v1';
import { PostNativeStack } from '@post/navigation/type';
import { PostReportMeetingPayload } from '@post/api/v1/type';
import { QueryKeys } from '@app/api/type';
import { invalidateQueries } from '@app/api/queryClient';
import useRestrictNavigation from '@shared/hooks/useRestrictNavigation';
import useKeyboardAwareScroll from '@shared/hooks/useKeyboardAwareScroll';
import useSearchManagement from '@post/hooks/useSearchManagement';
import { updateMeetingList } from '@post/components/deletion/Deletion';

const CONFIRM_TEXT = '모임 신고하기';
const LOADING_TEXT = '모임 신고중...';
const TOAST_CONFIG = {
  type: 'info',
  text1: '해당 모임 신고가 접수되었습니다',
  text2: '빠른 시일 내에 조치하도록 하겠습니다 죄송합니다.',
};

export default function MeetingPostReportForm({
  navigation,
  route: { params },
}: PostNativeStack<'MeetingPostReport'>) {
  const {
    searchState: { dateRange },
  } = useSearchManagement();
  const [state, dispatch] = useReportManagement();
  const hasChanged = isNull(state.title) || isNull(state.content);
  const { mutateAsync } = useMutation(requestDeleteMeeting, {
    onMutate: (postId) => {
      updateMeetingList(
        {
          dateFrom: dateRange.startingDay?.dateString,
          dateTo: dateRange.endingDay?.dateString,
        },
        postId,
      );
    },
    onSuccess: () => {
      Toast.show(TOAST_CONFIG);
      invalidateQueries(QueryKeys.post(params.id));
      navigation.reset({
        index: 0,
        routes: [{ name: 'MeetingPostList' }],
      });
    },
  });
  const { mutate: postReporMutate, isLoading: isSubmit } = useMutation(
    requestPostReportMeeting,
    {
      onSuccess: async () => {
        await mutateAsync(params.id);
      },
    },
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const [setYCoordinate, setFocusedItemKey] =
    useKeyboardAwareScroll(scrollViewRef);

  useRestrictNavigation(isSubmit);

  return (
    <SafeAreaView edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })}>
        <ScrollView
          ref={scrollViewRef}
          testID={TestId.post.report}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <Uploader onImage={dispatch.image} />
          <Title onInput={dispatch.title} />
          <Content
            onInput={dispatch.content}
            hasChanged={hasChanged}
            onLayout={setYCoordinate}
            onFocus={setFocusedItemKey}
          />
          <DividerWrapper>
            <ScreenLayout>
              <ConfirmCancelButton
                leftDisabled={isSubmit}
                rightDisabled={isSubmit || hasChanged}
                rightButtonColor={theme.lightColors?.warning}
                confirmText={isSubmit ? LOADING_TEXT : CONFIRM_TEXT}
                onPressLeft={() => navigation.goBack()}
                onPressRight={() => {
                  asyncWave([
                    Keyboard.dismiss,
                    () => generateReportPayload(params.id, state),
                    postReporMutate,
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
 * 서버에 요청할 올바른 페이로드 객체를 반환한다.
 *
 * - 이미지 객체가 존재한다면 이미지 변환 API를 요청한다.
 */
const generateReportPayload = async (
  targetId: number,
  postState: ReportState,
): Promise<PostReportMeetingPayload> => {
  const { asset, title, content } = postState;

  return {
    reportImageUrl: asset ? await requestImageURL(asset) : undefined,
    meetingId: targetId,
    title: title as string,
    content: content as string,
  };
};
