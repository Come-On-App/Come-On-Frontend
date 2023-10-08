import { useCallback } from 'react';
import { random } from 'lodash';
import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';

import { requestPutMyInfo } from '@account/api/v1';
import { GetMyInfoResponse } from '@account/api/v2/type';
import { QueryKey, QueryKeys } from '@app/api/type';
import { invalidateQueries, setQueryData } from '@app/api/queryClient';
import { PutMyInfoPayload } from '@account/api/v1/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { useQueryDataByUser } from './useMyInfoQuery';

const TOAST_CONFIG_USER_IMAGE = {
  type: 'success',
  text1: '사용자 정보 업데이트 완료',
  text2: '프로필 이미지를 성공적으로 변경하였습니다.',
};
const TOAST_CONFIG_NICKNAME = (changedNickname: string) => {
  return {
    type: 'success',
    text1: '사용자 정보 업데이트 완료',
    text2: getToastMessages(changedNickname),
  };
};

/**
 * [react-query] 활성화된 유저의 상세 정보를 변이한다.
 */
export default function useMyInfoMutation() {
  const userQueryData = useQueryDataByUser();
  const {
    detailState: { postId },
  } = useDetailManagement();
  const { mutate, isLoading } = useMutation(requestPutMyInfo, {
    onMutate: (payload) => {
      setQueryData<GetMyInfoResponse>(
        [QueryKey.user, QueryKey.self],
        (oldData) => updateUser(oldData, payload),
      );
    },
    onSuccess: () => {
      invalidateQueries(QueryKeys.postMembers(postId));
    },
  });
  const mutateUserImage = useCallback(
    (payload: string) => {
      if (!userQueryData) return;

      mutate(
        {
          nickname: userQueryData.nickname,
          profileImageUrl: payload,
        },
        {
          onSuccess: () => {
            Toast.show(TOAST_CONFIG_USER_IMAGE);
          },
        },
      );
    },
    [mutate, userQueryData],
  );
  const mutateUserNickname = useCallback(
    (payload: string) => {
      if (!userQueryData) return;

      mutate(
        {
          nickname: payload,
          profileImageUrl: userQueryData.profileImageUrl,
        },
        {
          onSuccess: () => {
            Toast.show(TOAST_CONFIG_NICKNAME(payload));
          },
        },
      );
    },
    [mutate, userQueryData],
  );

  return { isLoading, mutateUserImage, mutateUserNickname };
}

const updateUser = (
  oldData: GetMyInfoResponse | undefined,
  payload: PutMyInfoPayload,
): GetMyInfoResponse | undefined => {
  if (!oldData) return oldData;

  return {
    ...oldData,
    profileImageUrl: payload.profileImageUrl || oldData.profileImageUrl,
    nickname: payload.nickname || oldData.nickname,
  };
};
const getToastMessages = (changedNickname: string) => {
  const toastMessages = [
    `${changedNickname}으로 닉네임이 성공적으로 변경되었습니다.`,
    `닉네임이 ${changedNickname}으로 업데이트 되었습니다.`,
    `성공! ${changedNickname}으로 닉네임을 변경했습니다.`,
    `${changedNickname}으로 닉네임 업데이트가 완료되었습니다.`,
    `축하합니다! 닉네임이 ${changedNickname}으로 변경되었습니다.`,
  ];

  return toastMessages[random(0, 4)];
};
