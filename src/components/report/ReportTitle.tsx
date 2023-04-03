import React from 'react';

import { Form } from '@type/component.report';
import { Title } from '@screens/meeting/detail/common';
import { SetState } from '@type/index';
import { emptyString } from '@utils/fn';
import { reportConfig } from '@constants/config';
import { makeStyles } from '@rneui/themed';
import { Content, ReportInput } from './common';

interface ReportTitleProps {
  title: string;
  setForm: SetState<Form>;
}

const { text } = reportConfig;

function ReportTitle({ setForm, title }: ReportTitleProps) {
  const styles = useStyles();

  return (
    <Content>
      <Title title={text.title} />
      <ReportInput
        placeholder={emptyString}
        multiline={false}
        value={title}
        setState={setForm}
        keyType="title"
        containerStyle={styles.container}
      />
    </Content>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    textAlignVertical: 'center',
  },
}));

export default ReportTitle;
