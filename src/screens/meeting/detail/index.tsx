import React from 'react';
import { ScrollView, View } from 'react-native';

import type { RootStackScreenProps } from '@type/navigation';
import useSubscribe from '@hooks/useSubscribe';
import { makeStyles } from '@rneui/themed';
import Place from './place';
import Member from './Member';
import Date from './date';

// 모임 상세 (모임 카드 클릭시 스크린)
export default function MeetingDetail({
  route: {
    params: { meetingId },
  },
  navigation,
}: RootStackScreenProps<'MeetingDetail'>) {
  useSubscribe(meetingId);

  return (
    <Container>
      <Member />
      <Date />
      <Place meetingId={meetingId} navigation={navigation} />
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    marginHorizontal: 10,
    marginBottom: 30,
  },
  content: {
    alignItems: 'center',
  },
}));
