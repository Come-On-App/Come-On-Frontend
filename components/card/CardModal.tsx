import { View } from 'react-native';
import React, { useState } from 'react';
import { Button, Overlay, makeStyles } from '@rneui/themed';

import Font from '../StyledText';
import { CodeInput } from '../Code';
import { CardModalButtonProps, CardModalProps } from '../../types';

function CardModal({ isVisible, onClose }: CardModalProps) {
  const styles = useStyles();

  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlay}>
      <View style={styles.modalContainer}>
        <CardModalTitle />
        <CardModalCode />
        <CardModalText />
        <CardModalButtons onClose={onClose} />
      </View>
    </Overlay>
  );
}

function CardModalTitle() {
  const styles = useStyles();
  const TITLE_TEXT = '초대코드가 만료됐습니다!';

  return (
    <View style={styles.titleContainer}>
      <Font style={styles.title}>{TITLE_TEXT}</Font>
    </View>
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

function CardModalButtons({ onClose }: CardModalButtonProps) {
  const styles = useStyles();

  return (
    <View style={styles.buttonContainer}>
      <Button
        title="닫기"
        buttonStyle={styles.buttonRight}
        titleStyle={styles.buttonText}
        onPress={onClose}
      />
      <Button
        title="복사하기"
        buttonStyle={styles.buttonLeft}
        titleStyle={styles.buttonText}
      />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  overlay: {
    backgroundColor: theme.grayscale['0'],
    height: 240,
    width: '70%',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 28,
  },
  modalContainer: {
    alignItems: 'center',
  },
  titleContainer: {
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
    fontSize: theme.textStyles.title2.fontSize,
    fontWeight: '400',
  },
  textContainer: {
    marginTop: 12,
    marginBottom: 24,
  },
  text: {
    color: theme.grayscale['600'],
    lineHeight: theme.textStyles.body1.lineHeight,
    fontSize: theme.textStyles.body1.fontSize,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    justifyContent: 'center',
  },
  buttonRight: {
    width: 100,
    marginRight: 3,
    height: '100%',
    backgroundColor: theme.grayscale['300'],
  },
  buttonLeft: {
    marginRight: -3,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.grayscale['50'],
    fontFamily: 'pretendard',
    fontSize: 14,
    fontWeight: '400',
  },
}));

export default CardModal;
