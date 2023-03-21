import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import type { RootStackScreenProps } from '@type/navigation';
import useSubscribe from '@hooks/useSubscribe';
import { makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import {
  requestGetMeetingDetail,
  requestPostMeetingTime,
} from '@api/meeting/meetings';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useQuery } from 'react-query';
import useMeeting from '@hooks/useMeeting';
import Place from './place';
import Member from './Member';
import Date from './date';

const timeToKorStr = (time: string) => {
  const hh = parseInt(time.slice(0, 2), 10);
  const mm = parseInt(time.slice(3, 5), 10);

  if (hh > 12) return `오후 ${hh - 12}시 ${mm}분`;

  return `오전 ${hh}시 ${mm}분`;
};

// 모임 상세 (모임 카드 클릭시 스크린)
export default function MeetingDetail({
  route: {
    params: { meetingId },
  },
  navigation,
}: RootStackScreenProps<'MeetingDetail'>) {
  const [closeTime, setCloseTime] = useState(false);
  const navi = useNavigation();
  const onPressLabel = () => {
    navi.navigate('MeetingRoomCalendar', { meetingId });
  };
  const onPressOut = (
    openTime: boolean,
    setOpenTime: React.Dispatch<React.SetStateAction<boolean>>,
    time: string,
  ) => {
    if (openTime && closeTime) {
      setOpenTime(!openTime);

      // Host에 따라 다르게 ? 또는 rock?
      if (time)
        requestPostMeetingTime({
          meetingId,
          meetingStartTime: `${time}:00`,
        }).then(res => {
          if (res.success) {
            const timeKor = timeToKorStr(time);

            Toast.show({
              text1: `모임시간이 ${timeKor} 으로 설정되었습니다.`,
            });
          }
        });

      setCloseTime(false);
    }
  };
  const { data } = useQuery(['meetingDetail'], () =>
    requestGetMeetingDetail(meetingId),
  );

  useEffect(() => {
    if (!data) return;

    navigation.setOptions({
      title: data.meetingMetaData.meetingName,
    });
  }, [data, navigation]);

  if (!data) return null;

  return (
    <Container meetingId={meetingId}>
      <Pressable onPress={() => setCloseTime(!closeTime)}>
        <View>
          <Member meetingId={meetingId} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Date
              meetingId={meetingId}
              onPressOut={onPressOut}
              onPressLabel={onPressLabel}
            />
            <Place meetingId={meetingId} navigation={navigation} />
          </ScrollView>
        </View>
      </Pressable>
    </Container>
  );
}

function Container({
  children,
  meetingId,
}: {
  children: React.ReactNode;
  meetingId: number;
}) {
  const styles = useStyles();

  useSubscribe(meetingId);

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
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
