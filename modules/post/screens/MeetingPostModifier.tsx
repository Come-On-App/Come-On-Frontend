import { Keyboard, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { isNull, isEmpty } from 'lodash';

import { convertDateRangeToDateInfo, hasPostStateChanged } from '@shared/utils';
import TestId from '@shared/constants/testIds';
import { PostNativeStack } from '@post/navigation/type';
import { useMutation } from '@tanstack/react-query';
import { QueryKeys } from '@app/api/type';
import Uploader from '@post/components/modification/uploader/Uploader';
import MeetingName from '@post/components/modification/meetingName/MeetingName';
import VotingTimeRangePicker from '@post/components/modification/votingTimeRangePicker/VotingTimeRangePicker';
import usePostManagement from '@post/hooks/usePostManagement';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import { requestImageURL, requestPatchMeeting } from '@post/api/v1';
import { PostState } from '@post/features/post/type';
import { GetMeetingDetailResponse } from '@post/api/v2/type';
import { PatchMeetingPayload } from '@post/api/v1/type';
import { asyncWave } from 'async-wave';
import useMeetingDetailQuery from '@post/hooks/useMeetingDetailQuery';
import { invalidateQueries } from '@app/api/queryClient';

const CONFIRM_TEXT = '모임 수정하기';
const LOADING_TEXT = '모임 수정중...';

export default function MeetingPostModifier({
  navigation,
  route: { params },
}: PostNativeStack<'MeetingPostModification'>) {
  const { dispatch, initPostState, postState } = usePostManagement();
  const {
    data: response,
    isLoading,
    isSuccess,
  } = useMeetingDetailQuery(params.id);
  const { mutate, isLoading: isSubmit } = useMutation({
    mutationFn: requestPatchMeeting,
    onSuccess: () => {
      invalidateQueries(QueryKeys.post(params.id));
      navigation.reset({
        index: 0,
        routes: [{ name: 'MeetingPostList' }],
      });
    },
  });
  const isProcessing = isLoading || isSubmit;
  // 게시물 수정사항이 존재한다면 ture를 반환한다.
  const hasFormChanged =
    isSuccess && !hasPostStateChanged(generatePostData(response), postState);

  useEffect(() => {
    if (isSuccess) {
      dispatch(generatePostData(response));
    }

    return () => {
      initPostState();
    };
  }, [response, isSuccess, dispatch, initPostState]);

  return (
    <ScrollView
      testID={TestId.post.modifier}
      bounces={false}
      keyboardShouldPersistTaps="handled"
    >
      <Uploader isDataLoading={isLoading} />
      <MeetingName
        isDataLoading={isLoading}
        prevMeetingName={response?.meetingMetaData.meetingName}
      />
      <VotingTimeRangePicker isDataLoading={isLoading} />
      <DividerWrapper>
        <ScreenLayout>
          <ConfirmCancelButton
            leftDisabled={isSubmit}
            rightDisabled={
              isNull(postState.dateRange.startingDay) ||
              isEmpty(postState.name) ||
              hasFormChanged ||
              isProcessing
            }
            onPressLeft={() => navigation.goBack()}
            confirmText={isSubmit ? LOADING_TEXT : CONFIRM_TEXT}
            onPressRight={() => {
              asyncWave([
                Keyboard.dismiss,
                () => generatePostPayload(params.id, postState),
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
 * 형식에 맞는 객체를 반환한다.
 */
const generatePostData = (
  meetingDetail: GetMeetingDetailResponse,
): PostState => {
  const { meetingMetaData } = meetingDetail;
  const { thumbnailImageUrl, meetingName, calendar } = meetingMetaData;

  return {
    image: { asset: null, uri: thumbnailImageUrl },
    name: meetingName,
    dateRange: convertDateRangeToDateInfo(calendar),
  };
};
/**
 * [헬퍼 함수]
 * 서버에 요청할 올바른 페이로드 객체를 반환한다.
 *
 * - 이미지 객체가 존재한다면 이미지 변환 API를 요청한다.
 */
const generatePostPayload = async (
  targetId: number,
  postState: PostState,
): Promise<PatchMeetingPayload> => {
  const {
    dateRange: { startingDay, endingDay },
    image: { asset },
    name,
  } = postState;

  return {
    meetingId: targetId,
    payload: {
      meetingImageUrl: asset ? await requestImageURL(asset) : undefined,
      meetingName: name ?? undefined,
      calendarStartFrom: startingDay?.dateString,
      calendarEndTo: endingDay?.dateString,
    },
  };
};
