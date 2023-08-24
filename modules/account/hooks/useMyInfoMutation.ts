import { requestPutMyInfo } from '@account/api/v1';
import { GetMyInfoResponse } from '@account/api/v2/type';
import { useMutation } from '@tanstack/react-query';
import { QueryKeys } from '@app/api/type';
import { setQueryData } from '@app/api/queryClient';
import { PutMyInfoPayload } from '@account/api/v1/type';
import { useCallback } from 'react';
import { useQueryDataByUser } from './useMyInfoQuery';

/**
 * [react-query] 활성화된 유저의 상세 정보를 변이한다.
 */
export default function useMyInfoMutation() {
  const userQueryData = useQueryDataByUser();
  const { mutate, isLoading } = useMutation(requestPutMyInfo, {
    onMutate: (payload) => {
      setQueryData<GetMyInfoResponse>([QueryKeys.user], (oldData) =>
        updateUser(oldData, payload),
      );
    },
  });
  const mutateUserImage = useCallback(
    (payload: string) => {
      if (!userQueryData) return;

      mutate({
        nickname: userQueryData.nickname,
        profileImageUrl: payload,
      });
    },
    [mutate, userQueryData],
  );
  const mutateUserNickname = useCallback(
    (payload: string) => {
      if (!userQueryData) return;

      mutate({
        nickname: payload,
        profileImageUrl: userQueryData.profileImageUrl,
      });
    },
    [mutate, userQueryData],
  );

  return { isSubmit: isLoading, mutateUserImage, mutateUserNickname };
}

function updateUser(
  oldData: GetMyInfoResponse | undefined,
  payload: PutMyInfoPayload,
): GetMyInfoResponse | undefined {
  if (!oldData) return oldData;

  return {
    ...oldData,
    profileImageUrl: payload.profileImageUrl || oldData.profileImageUrl,
    nickname: payload.nickname || oldData.nickname,
  };
}
