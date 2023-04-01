import React from 'react';
import { View } from 'react-native';

import { Input, InputBoxTopTextLength } from '@components/input/InputText';
import { Form } from '@type/component.report';
import { Content } from '@components/report/common';
import { SetState } from '@type/index';
import { Title } from '@screens/meeting/detail/common';
import { report } from '@constants/config';

interface ReportDiscriptionProps {
  description: string;
  setForm: SetState<Form>;
}

function ReportDiscription({ setForm, description }: ReportDiscriptionProps) {
  return (
    <Content>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Title title={report.text.discription} />
        <InputBoxTopTextLength
          maxLength={report.maxLength}
          text={description}
        />
      </View>
      <Input
        multiline
        value={description}
        maxLength={report.maxLength}
        placeholder={report.text.placeholder}
        onChangeText={text => {
          setForm(prev => {
            return {
              ...prev,
              description: text,
            };
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

export default ReportDiscription;
