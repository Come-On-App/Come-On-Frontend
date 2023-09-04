import React, { useState } from 'react';
import { Pressable } from 'react-native';

import Font from '@shared/components/font/Font';

import useStyles from './style';
import { ICurrentVotingStatus } from './type';
import VoteDetailModal from '../modal/VoteDetailModal';
import showMemberCount from './util/showMemberCount';

export default function CurrentVotingStatus({
  voteCount,
  dateString,
  totalMember,
  myVoting,
}: ICurrentVotingStatus) {
  const { voteMemberCount } = useStyles({ voteCount, myVoting });
  const [modalStatus, setShowModal] = useState(false);
  const memberCount = showMemberCount(voteCount);

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <Font bold style={voteMemberCount}>
          {memberCount}
        </Font>
      </Pressable>
      <VoteDetailModal
        isShowModal={modalStatus}
        dateString={dateString}
        totalMember={totalMember}
        voteCount={voteCount}
        onBackdropPress={() => setShowModal(false)}
      />
    </>
  );
}
