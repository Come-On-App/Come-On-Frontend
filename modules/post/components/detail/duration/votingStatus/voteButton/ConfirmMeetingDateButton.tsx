import React from 'react';
import { useMutation } from '@tanstack/react-query';

import Button from '@shared/components/button/Button';
import {
  requestDeleteConfirmMeetingDate,
  requestPostConfirmMeetingDate,
} from '@post/api/v1';
import { setQueryData } from '@app/api/queryClient';
import { GetMeetingDetailResponse } from '@post/api/v2/type';
import { QueryKey } from '@app/api/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { PostConfirmMeetingDatePayload } from '@post/api/v1/type';
import { IConfirmMeetingDateButton } from './type';

const BUTTON_COLOR = '#24ABE4';

/**
 * 날짜 확정 여부 버튼
 */
export default function ConfirmMeetingDateButton({
  isHost,
  disabled,
  isFixed,
  currentDate,
}: IConfirmMeetingDateButton) {
  const { detailState } = useDetailManagement();
  const confirmMeetingDateMutation = useMutation(
    requestPostConfirmMeetingDate,
    {
      onMutate: (payload) => {
        handleMeetingDateMutation(detailState.postId, payload);
      },
    },
  );
  const deleteMeetingDateMutation = useMutation(
    requestDeleteConfirmMeetingDate,
    {
      onMutate: () => {
        handleMeetingDateMutation(detailState.postId, null);
      },
    },
  );
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
          ? deleteMeetingDateMutation.mutate(detailState.postId)
          : confirmMeetingDateMutation.mutate({
              meetingId: detailState.postId,
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
    [QueryKey.post, QueryKey.detail, meetingId],
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
) => (isFixed ? `확정된 모임 날짜 취소하기` : `${currentDate} 모임 확정하기`);
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
