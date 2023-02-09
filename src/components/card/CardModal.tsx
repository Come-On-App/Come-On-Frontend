import { View } from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';

import Modal from '../Modal';
import { BoldFont, Font } from '../Font';
import { CodeInput } from '../InviteCode';
import { ButtonGroup } from '../buttons/Buttons';
import type { CardModalButtonProps, CardModalProps } from '../../types';

export default function CardModal({ isVisible, onClose }: CardModalProps) {
  const styles = useStyles();

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <CardModalTop />
        <CardModalMain />
        <CardModalBottom onClose={onClose} />
      </View>
    </Modal>
  );
}

function CardModalTop() {
  const styles = useStyles();
  const TITLE_TEXT = '초대코드가 만료됐습니다!';

  return (
    <View style={styles.topContainer}>
      <BoldFont style={styles.title}>{TITLE_TEXT}</BoldFont>
    </View>
  );
}

function CardModalMain() {
  return (
    <>
      <CardModalCode />
      <CardModalText />
    </>
  );
}

function CardModalCode() {
  const [codeText, setCodeText] = useState('------');
  const onChangeTextHandler = () => {
    setCodeText(prevCode => prevCode);
  };
  const styles = useStyles();

  return (
    <CodeInput
      codeText={codeText}
      setCodeText={onChangeTextHandler}
      style={styles.code}
      showKeyboard={false}
    />
  );
}

function CardModalText() {
  const styles = useStyles();
  const MODAL_TEXT = '코드를 새로 생성하세요';

  return (
    <View style={styles.textContainer}>
      <Font style={styles.text}>{MODAL_TEXT}</Font>
    </View>
  );
}

function CardModalBottom({ onClose }: CardModalButtonProps) {
  const CANCEL_TEXT = '닫기';
  const COPY_TEXT = '복사하기';

  return (
    <ButtonGroup
      firstButton={{
        text: CANCEL_TEXT,
        onPress: onClose,
      }}
      secondButton={{
        text: COPY_TEXT,
        onPress: () => console.log('click secondButton'),
      }}
    />
  );
}

const useStyles = makeStyles(theme => ({
  topContainer: {
    marginBottom: 12,
  },
  title: {
    color: theme.grayscale['900'],
    fontSize: theme.textStyles.title3.fontSize,
    lineHeight: theme.textStyles.title3.lineHeight,
  },
  code: {
    width: 30,
    height: 40,
    lineHeight: 40,
    fontWeight: '400',
    fontSize: theme.textStyles.title2.fontSize,
  },
  textContainer: {
    marginTop: 12,
    marginBottom: 24,
  },
  text: {
    color: theme.grayscale['600'],
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
  },
  modalContainer: {
    alignItems: 'center',
  },
}));
