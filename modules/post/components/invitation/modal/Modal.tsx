import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
}: IinvitationModal) {
  const {
    button: { left, right },
    message: { status, subStatus },
  } = config[type];
  const { container } = useStyles();
  const [show, setStateModal] = useState(isVisible);
  const cancelHandler = () => setStateModal(false);

  useEffect(() => {
    setStateModal(isVisible);
  }, [isVisible]);

  return (
    <Overlay
      onBackdropPress={cancelHandler}
      testID={TestId.post.modal}
      isVisible={show}
      overlayStyle={container}
    >
      <Message text={status} />
      <Code value={code} />
      <SubMessage text={subStatus} />
      <View style={{ width: '100%' }}>
        <ConfirmCancelButton
          cancelText={left.text}
          confirmText={right.text}
          onCancelHandler={cancelHandler}
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
