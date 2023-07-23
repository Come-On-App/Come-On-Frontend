import React from 'react';
import { View } from 'react-native';

import TestId from '@shared/constants/testIds';
import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
import Modal from '@shared/components/modal/Modal';
import useStyles from './style';
import Message from '../display/Message';
import Code from '../code/Code';
import SubMessage from '../display/SubMessage';
import config from './config';
import { IinvitationModal } from './type';

export default function InvitationModal({
  isVisible,
  code,
  type,
  onPressRight,
  onPressLeft,
}: IinvitationModal) {
  const {
    button: { left, right },
    message: { status, subStatus },
  } = config[type];
  const { cButton } = useStyles();

  return (
    <Modal
      testID={TestId.post.modal.invitation}
      isVisible={isVisible}
      onBackdropPress={onPressLeft}
    >
      <Message text={status} />
      <Code value={code} />
      <SubMessage text={subStatus} />
      <View style={cButton}>
        <ConfirmCancelButton
          cancelText={left.text}
          confirmText={right.text}
          onCancelHandler={onPressLeft}
          onConfirmlHandler={onPressRight}
          leftButtonColor={left.color}
          leftDisabled={left.disabled}
          rightButtonColor={right.color}
          rightDisabled={right.disabled}
        />
      </View>
    </Modal>
  );
}
