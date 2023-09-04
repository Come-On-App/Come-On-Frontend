import { View } from 'react-native';
import React from 'react';
import { useMutation } from '@tanstack/react-query';

import { QueryKey } from '@app/api/type';
import { requestDeleteMeeting } from '@post/api/v1';
import { GetMeetingSliceResponse } from '@post/api/v2/type';
import useSearchManagement from '@post/hooks/useSearchManagement';
import { setQueryData } from '@app/api/queryClient';
import PostDeletionModal from './modal/Modal';
import { Ideletion } from './type';

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
    onSuccess: () => {
      setQueryData<GetMeetingSliceResponse>(
        [QueryKey.post, QueryKey.list, paramater],
        removeMeetingByPostId(id),
      );
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
