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
import { modalConfig } from '@constants/config';

const { text } = modalConfig;

function CardModal({ isVisible, onClose, meetingId }: CardModalProps) {
  const styles = useStyles();
  const [code, setCode] = useState<GetEntryCodeResponse>({
    entryCode: text.emptyCode,
    expiredAt: '',
    meetingId: 0,
  });
  const { data, isLoading } = useQuery(
    [QueryKeys.meetingDetail, QueryKeys.code, meetingId],
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
          successAlert(text.expiry);
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
  const styles = useStyles();

  return (
    <View style={styles.topContainer}>
      <BoldFont style={styles.title}>{text.loading(isLoading)}</BoldFont>
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

  return (
    <View style={styles.textContainer}>
      <Font style={styles.text}>{text.copy}</Font>
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
  const button = {
    backgroundColor: isCopiedText ? success.color : primary.color,
    secondText: isCopiedText ? text.button.success : text.button.copy,
  };
  const onPressHandler = setClipboard(stateAction).bind(undefined, code);

  return (
    <ButtonGroup
      firstButton={{
        text: text.button.cancel,
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
