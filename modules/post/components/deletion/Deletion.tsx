import { View } from 'react-native';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';

import { QueryKeys } from '@app/api/type';
import { requestDeleteMeeting } from '@post/api/v1';
import { GetMeetingSliceResponse } from '@post/api/v2/type';
import PostDeletionModal from './modal/Modal';
import { Ideletion } from './type';

export default function Deletion({ id, showModal, onClose }: Ideletion) {
  const queryClient = useQueryClient();
  const mutate = useMutation(requestDeleteMeeting, {
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      // Updates from Mutation Responses
      queryClient.setQueryData<GetMeetingSliceResponse>(
        [QueryKeys.meetings],
        (oldData) => {
          return oldData
            ? {
                ...oldData,
                contentsCount: oldData.contentsCount - 1,
                contents: oldData.contents.filter(
                  ({ meetingId }) => meetingId !== id,
                ),
              }
            : oldData;
        },
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
