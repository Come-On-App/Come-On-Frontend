import React, { useEffect } from 'react';
import { View } from 'react-native';

import { formatDateToKorean } from '@shared/utils';
import Font from '@shared/components/font/Font';

import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@app/api/type';
import { requestGetDateVotingDetails } from '@post/api/v1';
import useDetailManagement from '@post/hooks/useDetailManagement';
import useStyles from './style';
import { IDisplayDateAndCount } from './type';
import CurrentVotingStatus from './CurrentVotingStatus';

const ADD_DAY_OF_WEEK = true;
const SLIDER_TITLE = '날짜 범위를 선택해 주세요';

export default function DisplayDateAndCount({
  enabled,
  voteCount,
  dateString,
  totalMember,
  myVoting,
}: IDisplayDateAndCount) {
  const { display } = useStyles();
  const queryClient = useQueryClient();
  const { detailState } = useDetailManagement();
  const formatedDate = formatDateToKorean(dateString, ADD_DAY_OF_WEEK);

  useEffect(() => {
    if (enabled) {
      queryClient.prefetchQuery({
        queryKey: QueryKeys.postVoteDate(dateString),
        queryFn: ({ signal }) =>
          requestGetDateVotingDetails(
            { meetingId: detailState.postId, date: dateString },
            signal,
          ),
      });
    }
  }, [dateString, detailState.postId, enabled, queryClient]);

  return (
    <View style={display}>
      <Font>{enabled ? formatedDate : SLIDER_TITLE}</Font>
      {enabled ? (
        <CurrentVotingStatus
          myVoting={myVoting}
          voteCount={voteCount}
          totalMember={totalMember}
          dateString={dateString}
        />
      ) : null}
    </View>
  );
}
