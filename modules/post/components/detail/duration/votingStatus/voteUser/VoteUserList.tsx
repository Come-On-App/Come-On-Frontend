import { ActivityIndicator, ScrollView, View } from 'react-native';
import React from 'react';

import { isEmpty } from 'lodash';
import SubMessage from '@shared/components/modal/display/SubMessage';
import { GetDateVotingDetailsResponse } from '@post/api/v1/type';
import { EMPTY_STRING } from '@shared/utils';
import useStyles from './style';
import { IVoteUser, IVoteUserList } from './type';
import VoteUser from './VoteUser';

const SHOW_SCROLL_INDICATOR = false;

export default function VoteUserList({ voteStatus, isLoading }: IVoteUserList) {
  const { scrollViewOuterContainer, scrollViewContainer } = useStyles();

  if (isLoading) {
    return <LoadingItem />;
  }

  if (isEmpty(voteStatus?.votingUsers)) {
    return <Empty />;
  }

  // 투표 참여자 목록을 생성.
  const userList: IVoteUser[] = (
    voteStatus as GetDateVotingDetailsResponse
  ).votingUsers.map(({ nickname, profileImageUrl }) => ({
    userName: nickname,
    userAvatarPath: profileImageUrl ?? EMPTY_STRING,
  }));
  // 각 투표 참여자를 렌더링하는 함수
  const renderUserItem = (
    { userName, userAvatarPath }: IVoteUser,
    index: number,
  ) => (
    <VoteUser key={index} userName={userName} userAvatarPath={userAvatarPath} />
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={SHOW_SCROLL_INDICATOR}
      style={scrollViewOuterContainer}
      contentContainerStyle={scrollViewContainer}
    >
      {userList.map(renderUserItem)}
    </ScrollView>
  );
}

function LoadingItem() {
  const { center, indicatorStyle } = useStyles();

  return (
    <View style={center}>
      <ActivityIndicator color={indicatorStyle.color} />
    </View>
  );
}

function Empty() {
  const { center } = useStyles();
  const EMPTY_VOTER_LIST_MESSAGE = '해당 날짜에 투표 참여자가 없습니다.';

  return (
    <View style={center}>
      <SubMessage text={EMPTY_VOTER_LIST_MESSAGE} />
    </View>
  );
}
