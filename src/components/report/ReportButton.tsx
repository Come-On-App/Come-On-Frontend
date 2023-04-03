import React, { useState } from 'react';
import { View } from 'react-native';

import { Form } from '@type/component.report';
import { requestPostReportMeeting } from '@api/meeting/meetings';
import { promiseFlow } from '@utils/promise';
import { BoldFont } from '@components/Font';
import Icon from '@components/Icon';
import useMeetingMutation from '@hooks/query/useMeetingMutation';
import useGoToScreen from '@hooks/useGoTo';
import { reportConfig } from '@constants/config';
import Button from '@components/button/Buttons';
import Layout from '@components/Layout';
import { makeStyles } from '@rneui/themed';
import { createPayload } from './common';

interface ReportButtonProps {
  form: Form;
}

const { text } = reportConfig;

function ReportButton({ form }: ReportButtonProps) {
  const styles = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const { goBack } = useGoToScreen();
  const { deleteMeeting } = useMeetingMutation(text.deleteSuccessMessage);
  const isReady = form.title && form.description && form.meetingId;
  const onPressHandler = () => {
    setIsSubmit(true);
    promiseFlow(
      form,
      [
        createPayload,
        requestPostReportMeeting,
        () => deleteMeeting(form.meetingId),
      ],
      {
        onSuccess: () => {
          setIsSubmit(false);
          goBack();
        },
      },
    );
  };

  return (
    <View>
      {isReady && <ReportButtonDescription />}
      <Button
        bold
        loading={isSubmit}
        disabled={!isReady}
        onPress={onPressHandler}
        text={text.button}
        buttonStyle={styles.button}
      />
    </View>
  );
}

function ReportButtonDescription() {
  const styles = useStyles(Layout.isSmallDevice);

  return (
    <View style={styles.descriptionContainer}>
      <View style={styles.descriptionIcon}>
        <Icon size={styles.descriptionIcon.size} name="warning" />
      </View>
      <BoldFont style={styles.descriptionText}>{text.confirm}</BoldFont>
    </View>
  );
}

const useStyles = makeStyles((theme, isSmallDevice: boolean) => ({
  descriptionContainer: {
    minHeight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  descriptionIcon: {
    justifyContent: 'center',
    size: 18,
  },
  descriptionText: {
    fontSize: isSmallDevice ? 14 : 16,
  },
  button: {
    backgroundColor: theme.colors.warning,
  },
}));

export default ReportButton;
