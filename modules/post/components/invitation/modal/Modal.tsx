import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Overlay } from '@rneui/themed';

import TestId from '@shared/constants/testIds';
import ConfirmCancelButton from '@post/components/button/ConfirmCancelButton';
import useStyles from './style';
import { IinvitationModal } from './type';
import Message from '../display/Message';
import Code from '../code/Code';
import SubMessage from '../display/SubMessage';

export default function InvitationModal({
  isVisible,
  code,
  message: { status, subStatus },
  button: { left, right },
}: IinvitationModal) {
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
          onConfirmlHandler={right.onPress}
          leftButtonColor={left.color}
          leftDisabled={left.disabled}
          rightButtonColor={right.color}
          rightDisabled={right.disabled}
        />
      </View>
    </Overlay>
  );
}
