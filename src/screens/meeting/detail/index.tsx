import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import type { RootStackScreenProps } from '@type/navigation';
import useSubscribe from '@hooks/useSubscribe';
import { makeStyles } from '@rneui/themed';
import { useMeetingDetailQuery } from '@hooks/query/useMeetingQuery';
import { GetMeetingDetailResponse } from '@type/api.meeting';
import Place from './place';
import Member from './Member';
import Date from './date';

function useSetTitle(
  navigation: RootStackScreenProps<'MeetingDetail'>['navigation'],
  meetingDetail: GetMeetingDetailResponse | undefined,
) {
  useEffect(() => {
    if (!meetingDetail) return;

    navigation.setOptions({
      title: meetingDetail.meetingMetaData.meetingName,
    });
  }, [meetingDetail, navigation]);
}

// 모임 상세 (모임 카드 클릭시 스크린)
export default function MeetingDetail({
  route: {
    params: { meetingId },
  },
  navigation,
}: RootStackScreenProps<'MeetingDetail'>) {
  const { meetingDetail } = useMeetingDetailQuery(meetingId);

  useSubscribe(meetingId);
  useSetTitle(navigation, meetingDetail);

  if (!meetingDetail) {
    return null;
  }

  return (
    <Container FixedItem={<Member meetingId={meetingId} />}>
      <Date
        meetingId={meetingId}
        navigation={navigation}
        calendar={meetingDetail.meetingMetaData.calendar}
      />
      <Place meetingId={meetingId} navigation={navigation} />
    </Container>
  );
}

function Container({
  children,
  FixedItem,
}: {
  children: React.ReactNode;
  FixedItem: JSX.Element;
}) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {FixedItem}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  content: {
    alignItems: 'center',
  },
}));
