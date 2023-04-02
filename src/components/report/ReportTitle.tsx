import React from 'react';

import { Form } from '@type/component.report';
import { Title } from '@screens/meeting/detail/common';
import { SetState } from '@type/index';
import { emptyString } from '@utils/fn';
import { reportConfig } from '@constants/config';
import { Content, ReportInput } from './common';

interface ReportTitleProps {
  title: string;
  setForm: SetState<Form>;
}

const { text } = reportConfig;

function ReportTitle({ setForm, title }: ReportTitleProps) {
  return (
    <Content>
      <Title title={text.title} />
      <ReportInput
        placeholder={emptyString}
        multiline={false}
        value={title}
        setState={setForm}
        keyType="title"
      />
    </Content>
  );
}

export default ReportTitle;
