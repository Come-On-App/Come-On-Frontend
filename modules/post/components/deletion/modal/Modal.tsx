import { View } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import Modal from '@shared/components/modal/Modal';
import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import Message from '@shared/components/modal/display/Message';
import SubMessage from '@shared/components/modal/display/SubMessage';
import Spacer from '@shared/components/layout/Spacer';
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
      <Spacer height={box.height} />
      <SubMessage text={subStatus} />
      <View style={cButton}>
        <ConfirmCancelButton
          cancelText={left.text}
          confirmText={right.text}
          onPressLeft={onPressLeft}
          onPressRight={onPressRight}
          rightButtonColor={right.color}
        />
      </View>
    </Modal>
  );
}
