import React from 'react';
import { View } from 'react-native';
import { Overlay } from '@rneui/themed';

import TestId from '@shared/constants/testIds';
import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
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
  const { container, cButton } = useStyles();

  return (
    <Overlay
      testID={TestId.post.modal}
      isVisible={isVisible}
      overlayStyle={container}
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
    </Overlay>
  );
}
