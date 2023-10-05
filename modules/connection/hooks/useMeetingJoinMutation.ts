import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';

import { ErrorResponse } from '@app/api/type';
import { requestMeetingJoin } from '@connection/api/v1';
import { PostJoinPayload, PostJoinResponse } from '@connection/api/v1/type';
import { hapticError, hapticSuccess } from '@shared/utils/haptics';
import { EMPTY_STRING } from '@shared/utils';
import { JoinStatusDispatch } from '@connection/components/type';
import Toast from 'react-native-toast-message';

type TData = PostJoinResponse;
type TError = AxiosError<ErrorResponse>;
type TVariables = PostJoinPayload;
type TContext = unknown;

const TOAST_CONFIG_JOIN = {
  type: 'success',
  text1: '새로운 모임에 성공적으로 연결되었습니다 🎉',
  text2: '어떤 재미가 펼쳐질지 궁금하지 않나요?',
};
const TOAST_CONFIG_FAIL = (errorMessage: string) => {
  return {
    type: 'error',
    text1: '모임 입장에 실패하였습니다',
    text2: errorMessage,
  };
};

export default function useMeetingJoinMutation(dispatch: JoinStatusDispatch) {
  const mutate = useMutation<TData, TError, TVariables, TContext>(
    requestMeetingJoin,

    {
      retry: false,
      onMutate: () => {
        dispatch({
          isError: false,
          isLoading: true,
          errorMessage: EMPTY_STRING,
        });
      },
      onSuccess: () => {
        Toast.show(TOAST_CONFIG_JOIN);
        hapticSuccess();
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          const message = error.response.data.errorDescription;

          Toast.show(TOAST_CONFIG_FAIL(message));
          hapticError();
          dispatch({
            isError: true,
            isLoading: false,
            errorMessage: error.response.data.errorDescription,
          });
        }
      },
      onSettled: () => {
        dispatch((prev) => ({ ...prev, isLoading: false }));
      },
    },
  );

  return mutate;
}
