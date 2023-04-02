import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { ScrrenLayout } from '@components/Layout';
import { RootStackScreenProps } from '@type/navigation';
import { emptyString } from '@utils/fn';
import useAuth from '@hooks/useAuth';
import { Form } from '@type/component.report';
import ReportImage from '@components/report/ReportImage';
import ReportTitle from '@components/report/ReportTitle';
import ReportDiscription from '@components/report/ReportDiscription';
import ReportButton from '@components/report/ReportButton';

function ReportPost({ route }: RootStackScreenProps<'ReportPost'>) {
  const { myId } = useAuth();
  const [form, setForm] = useState<Form>({
    image: emptyString,
    title: emptyString,
    description: emptyString,
    userId: myId,
    meetingId: route.params.meetingId,
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <ScrrenLayout>
        <ReportImage setForm={setForm} image={form.image} />
        <ReportTitle setForm={setForm} title={form.title} />
        <ReportDiscription setForm={setForm} description={form.description} />
        <ReportButton />
      </ScrrenLayout>
    </ScrollView>
  );
}

export default ReportPost;
