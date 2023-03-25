import { View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { makeStyles } from '@rneui/themed';
import * as Clipboard from 'expo-clipboard';

import type {
  CardModalButtonProps,
  CardModalProps,
  CardModalTopProps,
  Code,
} from '@type/component.card';
import Font, { BoldFont } from '@components/Font';
import Modal from '@components/Modal';
import { CodeInput } from '@components/InviteCode';
import { ButtonGroup } from '@components/button/Buttons';
import { useQuery } from 'react-query';
import { QueryKeys } from '@api/queryClient';
import {
  requestGetEntryCode,
  requestPostEntryCode,
} from '@api/meeting/meetings';
import { GetEntryCodeResponse, ErrorMeetingResponse } from '@type/api.meeting';
import { SetState } from '@type/index';
import { promiseFlow } from '@utils/promise';
import { isExpiry } from '@utils/fn';
import { errorAlert, successAlert } from '@utils/alert';

function CardModal({ isVisible, onClose, meetingId }: CardModalProps) {
  const styles = useStyles();
  const [code, setCode] = useState<GetEntryCodeResponse>({
    entryCode: '------',
    expiredAt: '',
    meetingId: 0,
  });
  const { data, isLoading } = useQuery(
    [QueryKeys.meetingDetail, QueryKeys.time, meetingId],
    () => requestGetEntryCode(meetingId),
    {
      enabled: isVisible,
    },
  );

  useEffect(() => {
    if (!data) return;

    setCode(data);

    if (isExpiry(data.expiredAt)) {
      promiseFlow(data.meetingId, [requestPostEntryCode, setCode], {
        onSuccess: () => {
          successAlert('코드가 만료되어 갱신되었습니다!');
        },
        onError: (error: ErrorMeetingResponse) => {
          errorAlert(error.response.data.errorDescription);
        },
      });
    }
  }, [data]);

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <CardModalTop isLoading={isLoading} />
        <CardModalMain code={code.entryCode} />
        <CardModalBottom code={code.entryCode} onClose={onClose} />
      </View>
    </Modal>
  );
}

function CardModalTop({ isLoading }: CardModalTopProps) {
  const text = isLoading ? '초대코드 확인중...' : '초대코드가 생성됐습니다!';
  const styles = useStyles();

  return (
    <View style={styles.topContainer}>
      <BoldFont style={styles.title}>{text}</BoldFont>
    </View>
  );
}

function CardModalMain({ code }: Code) {
  return (
    <>
      <CardModalCode code={code} />
      <CardModalText />
    </>
  );
}

function CardModalCode({ code }: Code) {
  const styles = useStyles();

  return (
    <CodeInput
      codeText={code}
      setCodeText={() => undefined}
      style={styles.code}
      showKeyboard={false}
    />
  );
}

function CardModalText() {
  const styles = useStyles();
  const MODAL_TEXT = '복사해서 사용하세요';

  return (
    <View style={styles.textContainer}>
      <Font style={styles.text}>{MODAL_TEXT}</Font>
    </View>
  );
}

const setClipboard = (stateAction: SetState<boolean>) => {
  return async (code: string) => {
    await Clipboard.setStringAsync(code);
    stateAction(true);
  };
};

function CardModalBottom({ onClose, code }: CardModalButtonProps) {
  const { primary, success } = useStyles();
  const [isCopiedText, stateAction] = useState(false);
  const text = {
    cancel: '닫기',
    copy: '복사하기',
    success: '복사완료!',
  };
  const button = {
    backgroundColor: isCopiedText ? success.color : primary.color,
    secondText: isCopiedText ? text.success : text.copy,
  };
  const onPressHandler = setClipboard(stateAction).bind(undefined, code);

  return (
    <ButtonGroup
      firstButton={{
        text: text.cancel,
        onPress: onClose,
      }}
      secondButton={{
        text: button.secondText,
        style: { backgroundColor: button.backgroundColor },
        onPress: onPressHandler,
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
  success: {
    color: theme.colors.success,
  },
  primary: {
    color: theme.colors.primary,
  },
}));

export default memo(CardModal);
