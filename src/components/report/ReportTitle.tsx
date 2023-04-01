import React from 'react';

import { Form } from '@type/component.report';
import { Title } from '@screens/meeting/detail/common';
import { SetState } from '@type/index';
import { Input } from '@components/input/InputText';
import { emptyString } from '@utils/fn';
import { report } from '@assets/config';
import { Content } from './common';

interface ReportTitleProps {
  title: string;
  setForm: SetState<Form>;
}

function ReportTitle({ setForm, title }: ReportTitleProps) {
  return (
    <Content>
      <Title title={report.text.title} />
      <Input
        multiline={false}
        value={title}
        maxLength={report.maxLength}
        placeholder={emptyString}
        onChangeText={text => {
          setForm(prev => {
            return { ...prev, title: text };
          });
        }}
        containerStyle={{
          marginVertical: 5,
          padding: 5,
        }}
      />
    </Content>
  );
}

export default ReportTitle;
