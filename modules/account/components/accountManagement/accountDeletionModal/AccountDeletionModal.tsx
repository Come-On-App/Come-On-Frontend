import React from 'react';
import { View } from 'react-native';

import Message from '@shared/components/modal/display/Message';
import SubMessage from '@shared/components/modal/display/SubMessage';
import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import TestId from '@shared/constants/testIds';
import Modal from '@shared/components/modal/Modal';
import Spacer from '@shared/components/layout/Spacer';
import useStyles from './style';
import { IpostDeletionModal } from './type';

const TITLE = '회원 탈퇴를 진행하시겠습니까?';
const SUB_MESSAGE_1 = '모든 데이터는 영구적으로 삭제되며,';
const SUB_MESSAGE_2 = '복구할 수 없습니다.';
const CONFIRM_TEXT_1 = '회원탈퇴';
const CONFIRM_TEXT_2 = '회원탈퇴 중...';

export default function AccountDeletionModal({
  isVisible,
  onPressLeft,
  onPressRight,
  isSubmit,
}: IpostDeletionModal) {
  const { cButton, box, rightButton } = useStyles();

  return (
    <Modal
      testID={TestId.account.modal.accountDeletion}
      isVisible={isVisible}
      onBackdropPress={onPressLeft}
    >
      <Message text={TITLE} />
      <Spacer height={box.height} />
      <SubMessage text={SUB_MESSAGE_1} />
      <SubMessage text={SUB_MESSAGE_2} />
      <View style={cButton}>
        <ConfirmCancelButton
          rightDisabled={isSubmit}
          confirmText={isSubmit ? CONFIRM_TEXT_2 : CONFIRM_TEXT_1}
          onPressLeft={onPressLeft}
          onPressRight={onPressRight}
          rightButtonColor={rightButton.color}
        />
      </View>
    </Modal>
  );
}
