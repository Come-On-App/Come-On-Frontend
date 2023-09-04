import React from 'react';
import { View } from 'react-native';

import Modal from '@shared/components/modal/Modal';
import Message from '@shared/components/modal/display/Message';
import SubMessage from '@shared/components/modal/display/SubMessage';
import Spacer from '@shared/components/layout/Spacer';
import TestId from '@shared/constants/testIds';
import { formatDateToKorean } from '@shared/utils';
import useDetailManagement from '@post/hooks/useDetailManagement';
import useDateVotingDetailsQuery from '@post/hooks/useDateVotingDetailsQuery';
import useStyles from './style';
import VoteUserList from '../voteUser/VoteUserList';
import { IVoteDetailModal } from './type';

const ADD_DAY_OF_WEEK = true;

export default function VoteDetailModal({
  dateString,
  totalMember,
  voteCount,
  isShowModal,
  onBackdropPress,
}: IVoteDetailModal) {
  const {
    modalStyle,
    headerContainer,
    messageStyle,
    subMessageStyle,
    spacerStyle,
    modalContainer,
  } = useStyles();
  const voteCountText = `${voteCount}/${totalMember}`;
  const formatedDate = formatDateToKorean(dateString, ADD_DAY_OF_WEEK);
  const { detailState } = useDetailManagement();
  const { data: voteStatus, isLoading } = useDateVotingDetailsQuery(
    detailState.postId,
    dateString,
  );

  return (
    <Modal
      isVisible={isShowModal}
      onBackdropPress={onBackdropPress}
      testID={TestId.post.modal.vote}
      modalStyle={modalStyle}
    >
      <View style={headerContainer}>
        <Message text={formatedDate} customStyle={messageStyle} />
        <SubMessage text={voteCountText} customStyle={subMessageStyle} />
      </View>
      <View style={modalContainer}>
        <VoteUserList voteStatus={voteStatus} isLoading={isLoading} />
        <Spacer height={spacerStyle.height} applyRelative />
      </View>
    </Modal>
  );
}
