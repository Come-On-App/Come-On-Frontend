import React from 'react';
import { View } from 'react-native';

import { InputBoxTopTextLength } from '@components/input/InputText';
import { Form } from '@type/component.report';
import { Content, ReportInput } from '@components/report/common';
import { SetState } from '@type/index';
import { Title } from '@screens/meeting/detail/common';
import { reportConfig } from '@constants/config';
import { makeStyles } from '@rneui/themed';

const { maxLength, text } = reportConfig;

interface ReportDiscriptionProps {
  description: string;
  setForm: SetState<Form>;
}

interface ReportTitleProps {
  description: string;
}

function ReportDiscription({ setForm, description }: ReportDiscriptionProps) {
  return (
    <Content>
      <ReportTitle description={description} />
      <ReportInput
        multiline
        placeholder={text.placeholder}
        value={description}
        setState={setForm}
        keyType="description"
      />
    </Content>
  );
}

function ReportTitle({ description }: ReportTitleProps) {
  const styles = useStyles();

  return (
    <View style={styles.reportTitleContainer}>
      <Title title={text.discription} />
      <InputBoxTopTextLength maxLength={maxLength} text={description} />
    </View>
  );
}

const useStyles = makeStyles(() => ({
  reportTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export default ReportDiscription;
