import React from 'react';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import Button from '@shared/components/button/Button';
import {
  requestDeleteConfirmMeetingDate as requestDelete,
  requestPostConfirmMeetingDate as requestPost,
} from '@post/api/v1';
import { setQueryData } from '@app/api/queryClient';
import { GetMeetingDetailResponse } from '@post/api/v2/type';
import { QueryKeys } from '@app/api/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { PostConfirmMeetingDatePayload } from '@post/api/v1/type';
import { IConfirmMeetingDateButton } from './type';

const BUTTON_COLOR = '#24ABE4';
const TOAST_CONFIG_CONFIRM = (meetingDate: string) => {
  return {
    type: 'success',
    text1: '모임 날짜가 확정되었습니다 🎉',
    text2: `${meetingDate}일에 만나요~`,
  };
};
const TOAST_CONFIG_DELETE = {
  type: 'success',
  text1: '확정된 모임을 취소하였습니다',
  text2: '다른 날짜로 모임을 확정해 보세요!',
};

/**
 * 날짜 확정 여부 버튼
 */
export default function ConfirmMeetingDateButton({
  isHost,
  disabled,
  isFixed,
  currentDate,
}: IConfirmMeetingDateButton) {
  const {
    detailState: { postId },
  } = useDetailManagement();
  const confirmMeetingDateMutation = useMutation(requestPost, {
    onMutate: (payload) => {
      handleMeetingDateMutation(postId, payload);
      Toast.show(
        TOAST_CONFIG_CONFIRM(payload.meetingDate.meetingDateStartFrom),
      );
    },
  });
  const deleteMeetingDateMutation = useMutation(requestDelete, {
    onMutate: () => {
      handleMeetingDateMutation(postId, null);
      Toast.show(TOAST_CONFIG_DELETE);
    },
  });
  const isLoading =
    deleteMeetingDateMutation.isLoading || confirmMeetingDateMutation.isLoading;

  if (!isHost) {
    return null;
  }

  return (
    <Button
      bold
      backgroundColor={BUTTON_COLOR}
      title={getButtonTitle(
        disabled,
        isLoading,
        toggleMeetingConfirmationText(isFixed, currentDate),
      )}
      disabled={isLoading || disabled}
      onPress={() =>
        isFixed
          ? deleteMeetingDateMutation.mutate(postId)
          : confirmMeetingDateMutation.mutate({
              meetingId: postId,
              meetingDate: {
                meetingDateStartFrom: currentDate,
                meetingDateEndTo: currentDate,
              },
            })
      }
    />
  );
}

const handleMeetingDateMutation = (
  meetingId: number,
  payload: PostConfirmMeetingDatePayload | null,
) => {
  setQueryData<GetMeetingDetailResponse>(
    QueryKeys.postDetail(meetingId),
    (oldData) => updateMeetingDetail(oldData, payload),
  );
};
const updateMeetingDetail = (
  oldData: GetMeetingDetailResponse | undefined,
  payload: PostConfirmMeetingDatePayload | null,
) => {
  if (!oldData) return oldData;

  return {
    ...oldData,
    meetingMetaData: {
      ...oldData.meetingMetaData,
      fixedDate: payload
        ? {
            startFrom: payload.meetingDate.meetingDateStartFrom,
            endTo: payload.meetingDate.meetingDateEndTo,
          }
        : null,
    },
  };
};
// 모임 확정 상태에 따른 버튼 타이틀 생성 (확정/취소)
const toggleMeetingConfirmationText = (
  isFixed: boolean,
  currentDate: string,
) => {
  return isFixed ? `확정된 모임 날짜 취소하기` : `${currentDate} 모임 확정하기`;
};
const getButtonTitle = (
  disabled: boolean,
  isLoading: boolean,
  confirmationText: string,
) => {
  const MEETING_VOTE_IN_PROGRESS_TEXT = '모임 처리하는 중...';
  const SELECT_DATE_PROMPT_TEXT = '확정 날짜를 선택해 주세요';

  if (disabled) {
    return SELECT_DATE_PROMPT_TEXT;
  }

  if (isLoading) {
    return MEETING_VOTE_IN_PROGRESS_TEXT;
  }

  return confirmationText;
};
