import { View } from 'react-native';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { QueryKeys } from '@app/api/type';
import { requestDeleteMeeting } from '@post/api/v1';
import { GetMeetingSliceResponse } from '@post/api/v2/type';
import useSearchManagement from '@post/hooks/useSearchManagement';
import { setQueryData } from '@app/api/queryClient';
import PostDeletionModal from './modal/Modal';
import { Ideletion } from './type';

const TOAST_CONFIG = {
  type: 'error',
  text1: '모임을 안전하게 탈퇴하였습니다',
  text2: '다른 모임에서 꼭 다시 만나요! 👋',
};

export default function Deletion({ id, showModal, onClose }: Ideletion) {
  const {
    searchState: { dateRange },
  } = useSearchManagement();
  // 검색 API 요청 파라미터
  const paramater = {
    dateFrom: dateRange.startingDay?.dateString,
    dateTo: dateRange.endingDay?.dateString,
  };
  const mutate = useMutation(requestDeleteMeeting, {
    onMutate: () => {
      setQueryData<GetMeetingSliceResponse>(
        QueryKeys.meetingCardList(paramater),
        removeMeetingByPostId(id),
      );
    },
    onSuccess: () => {
      Toast.show(TOAST_CONFIG);
    },
  });

  return (
    <View>
      <PostDeletionModal
        isVisible={showModal}
        onPressLeft={onClose}
        onPressRight={() => mutate.mutate(id)}
      />
    </View>
  );
}

export function updateMeetingList(
  date: {
    dateFrom: string | undefined;
    dateTo: string | undefined;
  },
  postId: number,
) {
  setQueryData<GetMeetingSliceResponse>(
    QueryKeys.meetingCardList(date),
    removeMeetingByPostId(postId),
  );
}

function removeMeetingByPostId(id: number) {
  return (oldData: GetMeetingSliceResponse | undefined) => {
    if (!oldData) return oldData;

    const updatedContents = oldData.contents.filter(
      ({ meetingId }) => meetingId !== id,
    );

    return {
      ...oldData,
      contentsCount: oldData.contentsCount - 1,
      contents: updatedContents,
    };
  };
}
