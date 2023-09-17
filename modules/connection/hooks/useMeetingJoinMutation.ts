import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';

import { ErrorResponse } from '@app/api/type';
import { requestMeetingJoin } from '@connection/api/v1';
import { PostJoinPayload, PostJoinResponse } from '@connection/api/v1/type';
import { hapticError, hapticSuccess } from '@shared/utils/haptics';
import { EMPTY_STRING } from '@shared/utils';
import { JoinStatusDispatch } from '@connection/components/type';

type TData = PostJoinResponse;
type TError = AxiosError<ErrorResponse>;
type TVariables = PostJoinPayload;
type TContext = unknown;

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
        hapticSuccess();
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
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
