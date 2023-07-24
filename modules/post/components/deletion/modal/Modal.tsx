import { View } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import Modal from '@shared/components/modal/Modal';
import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
import Message from '@shared/components/modal/display/Message';
import SubMessage from '@shared/components/modal/display/SubMessage';
import useStyles from './style';
import { IpostDeletionModal } from './type';
import config from './config';

export default function PostDeletionModal({
  isVisible,
  onPressLeft,
  onPressRight,
}: IpostDeletionModal) {
  const {
    button: { left, right },
    message: { status, subStatus },
  } = config;
  const { cButton, box } = useStyles();

  return (
    <Modal
      testID={TestId.post.modal.deletion}
      isVisible={isVisible}
      onBackdropPress={onPressLeft}
    >
      <Message text={status} />
      <View style={box} />
      <SubMessage text={subStatus} />
      <View style={cButton}>
        <ConfirmCancelButton
          cancelText={left.text}
          confirmText={right.text}
          onCancelHandler={onPressLeft}
          onConfirmlHandler={onPressRight}
          rightButtonColor={right.color}
        />
      </View>
    </Modal>
  );
}
