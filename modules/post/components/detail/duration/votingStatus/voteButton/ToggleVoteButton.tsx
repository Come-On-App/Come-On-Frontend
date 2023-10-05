import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { noop, omit } from 'lodash';
import Toast from 'react-native-toast-message';

import Button from '@shared/components/button/Button';
import Icon from '@shared/components/icon/Icon';
import { FixedDate, GetMeetingMemberMeResponse } from '@post/api/v2/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { requestGetAddDateVoting, requestDeleteDateVoting } from '@post/api/v1';
import { setQueryData } from '@app/api/queryClient';
import {
  GetDateVotingDetailsResponse,
  GetDateVotingListResponse,
  PostDateVotingPayload,
} from '@post/api/v1/type';
import { QueryKeys } from '@app/api/type';
import { indexByProperty } from '@shared/utils';
import { useQueryDataByMeetingMemberMe } from '@post/hooks/useMeetingMemberMeQuery';
import { hapticSuccess } from '@shared/utils/haptics';
import { HandleVoteMutationProps, IToggleVoteButton } from './type';
import useStyles from './style';

const VOTE_PROCESSING_TEXT = '투표 처리하는중...';
const TOAST_CONFIG_VOTE = (date: string) => {
  return {
    type: 'success',
    text1: `${date} 모임 투표를 하였습니다 🎉`,
    text2: '다른 날짜도 투표를 해보는 건 어떤가요?',
  };
};
const TOAST_CONFIG_VOTE_CANCEL = (date: string) => {
  return {
    type: 'success',
    text1: `${date} 모임 투표를 취소하였습니다`,
    text2: '더 좋은 날짜가 있을거에요!',
  };
};

/**
 * 투표 버튼 컴포넌트
 */
export default function ToggleVoteButton({
  disabled,
  isFixed,
  myVoting,
  fixedDate,
  currentDate,
}: IToggleVoteButton) {
  const { button } = useStyles(myVoting);
  const { detailState } = useDetailManagement();
  const iconElement = isFixed ? null : (
    <Icon color="white" name="how-to-vote" size={20} />
  );
  const myMeetingStatus = useQueryDataByMeetingMemberMe(detailState.postId);
  const mutateVote = useMutation(
    myVoting ? requestDeleteDateVoting : requestGetAddDateVoting,
    {
      onMutate: (payload) => {
        handleVoteMutation({
          currentDate,
          myMeetingStatus,
          payload,
          isAdding: !myVoting,
        });
        const TOAST_CONFIG = myVoting
          ? TOAST_CONFIG_VOTE_CANCEL
          : TOAST_CONFIG_VOTE;

        Toast.show(TOAST_CONFIG(payload.date));
      },
      onSuccess: () => {
        return myVoting ? hapticSuccess() : noop();
      },
    },
  );

  return (
    <Button
      bold
      Icon={iconElement}
      title={
        mutateVote.isLoading
          ? VOTE_PROCESSING_TEXT
          : formatMeetingConfirmation({
              isFixed,
              fixedDate,
              myVoting,
              disabled,
            })
      }
      backgroundColor={button.color}
      disabled={mutateVote.isLoading || disabled}
      onPress={() =>
        mutateVote.mutate({ meetingId: detailState.postId, date: currentDate })
      }
    />
  );
}

const handleVoteMutation = ({
  currentDate,
  isAdding,
  myMeetingStatus,
  payload,
}: HandleVoteMutationProps) => {
  setQueryData<GetDateVotingListResponse>(
    QueryKeys.postVoteDetail(payload.meetingId),
    (oldData) => updateVoteList(oldData, payload, isAdding),
  );

  setQueryData<GetDateVotingDetailsResponse>(
    QueryKeys.postVoteDate(currentDate),
    (oldData) => updateVoteUserList(oldData, myMeetingStatus, isAdding),
  );
};

function updateVoteUserList(
  oldData: GetDateVotingDetailsResponse | undefined,
  myMeetingStatus: GetMeetingMemberMeResponse | undefined,
  isAdding: boolean,
) {
  if (!oldData) return oldData;

  const newUser = omit(myMeetingStatus, ['memberId']);
  const updatedData = {
    ...oldData,
    myVoting: isAdding,
    memberCount: oldData.memberCount + (isAdding ? 1 : -1),
    votingUsers: isAdding
      ? [...oldData.votingUsers, newUser]
      : oldData.votingUsers.filter(
          ({ userId }) => userId !== myMeetingStatus?.userId,
        ),
  };

  return updatedData;
}

function updateVoteList(
  oldData: GetDateVotingListResponse | undefined,
  payload: PostDateVotingPayload,
  increment: boolean,
) {
  if (!oldData) return oldData;

  const prevContents = [...oldData.contents];
  const { getByKey } = indexByProperty(prevContents, 'date');
  const targetPayload = getByKey(payload.date) ?? {
    date: payload.date,
    memberCount: 1,
    myVoting: true,
  };
  const targetIndex = prevContents.findIndex(
    (item) => item.date === payload.date,
  );
  const newCount = increment ? 1 : -1;
  const nextContentsCount = oldData.contentsCount + newCount;

  if (targetIndex !== -1) {
    const nextMemberCount = targetPayload.memberCount + newCount;

    prevContents[targetIndex] = {
      date: targetPayload.date,
      memberCount: nextMemberCount,
      myVoting: increment,
    };

    return {
      contentsCount: nextContentsCount,
      contents: prevContents,
    };
  }

  return {
    contentsCount: nextContentsCount,
    contents: [...prevContents, targetPayload],
  };
}

// 모임 확정 상태에 따른 버튼 타이틀 생성
const formatMeetingConfirmation = ({
  isFixed,
  fixedDate,
  myVoting,
  disabled,
}: {
  isFixed: boolean;
  fixedDate: FixedDate;
  myVoting: boolean;
  disabled: boolean;
}) => {
  const VOTE = '투표하기';
  const CANCEL_VOTE = '투표 취소하기';

  // 투표가 비활성화되어 있고, 모임이 확정되지 않았을 경우
  if (disabled && !isFixed) return VOTE;

  // 모임이 확정된 경우
  if (isFixed) {
    return `${fixedDate?.startFrom} 모임 확정됨`;
  }

  // 투표 상태에 따른 라벨
  return myVoting ? CANCEL_VOTE : VOTE;
};
