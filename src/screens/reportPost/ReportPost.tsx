import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { ScrrenLayout } from '@components/Layout';
import { RootStackScreenProps } from '@type/navigation';
import { emptyString } from '@utils/fn';
import { Form } from '@type/component.report';
import ReportTitle from '@components/report/ReportTitle';
import ReportDiscription from '@components/report/ReportDiscription';
import ReportButton from '@components/report/ReportButton';
import ReportImage from '@components/report/ReportImage';

function ReportPost({ route }: RootStackScreenProps<'ReportPost'>) {
  const [form, setForm] = useState<Form>({
    meetingId: route.params.meetingId,
    title: emptyString,
    description: emptyString,
    reportImageAsset: null,
  });

  return (
    <ScrollView>
      <ScrrenLayout>
        <ReportImage setForm={setForm} image={form.reportImageAsset} />
        <ReportTitle setForm={setForm} title={form.title} />
        <ReportDiscription setForm={setForm} description={form.description} />
        <ReportButton form={form} />
      </ScrrenLayout>
    </ScrollView>
  );
}

export default ReportPost;
