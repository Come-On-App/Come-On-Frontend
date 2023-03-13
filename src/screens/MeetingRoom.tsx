/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { makeStyles, Skeleton } from '@rneui/themed';
import { Client } from '@stomp/stompjs';
import MapView from 'react-native-maps';

import {
  requestGetMeetingDetail,
  requestPostMeetingTime,
} from '@api/meeting/meetings';
import GenerateLog from '@utils/GenerateLog';
import { useAppDispatch } from '@app/hooks';
import { RootStackScreenProps } from '@type/navigation';
import { GetMeetingDetailResponse } from '@type/api.meeting';
import { useNavigation } from '@react-navigation/native';

import { setMeetingUpdateEnd, setMemberUpdateEnd } from '@features/socketSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import DateContainer from '@components/meeting/DateContainer';
import useSocketMeeting from '@hooks/useSocketMeeting';
import Label from '../components/input/Label';
import PlaceCard from '../components/places/PlaceCard';
import MemberBox from '../components/member/MemberBox';
import AddPlaceButton from '../components/buttons/AddPlaceButton';
import WebSocketProvider, { WebSocketContext } from '../WebSocketProvider';

function MeetingRoomSkeleton() {
  const styles = useStyles();
  const config = {
    label: {
      width: 80,
      height: 25,
    },
    members: {
      circleSize: 38,
      marginRight: 7,
    },
    datebox: {
      height: 50,
      margin: 12,
      leftFlex: 0.7,
      rightFlex: 0.35,
    },
    map: {
      height: 300,
      borderRadius: 12,
      margin: 12,
    },
    card: {
      numberingSize: 22,
    },
    cardStyle: {
      flex: 8.5,
      width: 305, // 임시
      height: 80,
      borderRadius: 4,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Skeleton width={config.label.width} height={config.label.height} />
        <Skeleton width={config.label.width} height={config.label.height} />
      </View>
      <View style={styles.memberBox}>
        <Skeleton
          circle
          width={config.members.circleSize}
          style={{ marginRight: config.members.marginRight }}
        />
      </View>
      <Skeleton width={config.label.width} height={config.label.height} />
      <View style={[styles.dateBoxContainer]}>
        <Skeleton
          height={config.datebox.height}
          style={{
            flex: config.datebox.leftFlex,
            marginRight: config.datebox.margin,
          }}
        />
        <Skeleton
          height={config.datebox.height}
          style={{ flex: config.datebox.rightFlex }}
        />
      </View>
      <View style={{ marginVertical: config.datebox.margin }}>
        <Skeleton height={config.datebox.height} />
      </View>
      <Skeleton width={config.label.width} height={config.label.height} />

      <Skeleton
        height={config.map.height}
        style={{
          borderRadius: config.map.borderRadius,
          marginTop: config.map.margin,
        }}
      />
      <View style={styles.wrapContainer}>
        <View style={styles.cardNumberingBox}>
          <Skeleton circle width={config.card.numberingSize} />
        </View>
        <Skeleton style={config.cardStyle} />
      </View>
    </View>
  );
}

const timeToKorStr = (time: string) => {
  const hh = parseInt(time.slice(0, 2), 10);
  const mm = parseInt(time.slice(3, 5), 10);

  if (hh > 12) return `오후 ${hh - 12}시 ${mm}분`;

  return `오전 ${hh}시 ${mm}분`;
};

function MeetingRoom({ navigation }: RootStackScreenProps<'MeetingRoom'>) {
  const meetingId = 130;
  const styles = useStyles();
  const navi = useNavigation();
  const dispatch = useAppDispatch();
  const guideText = '새로운 코스를 추가해보세요!';
  const [closeTime, setCloseTime] = useState(false);
  const client =
    useContext<React.MutableRefObject<Client>>(WebSocketContext).current;
  const log = GenerateLog('log', { time: true, hidden: false });
  const [meetingData, setMeetingData] = useState<GetMeetingDetailResponse>();
  const { MEETING_UPDATE, MEMBER_UPDATE, onMessage } = useSocketMeeting();
  const onPressLabel = () => {
    navi.navigate('MeetingRoomCalendar');
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
  const getMeetingData = () => {
    requestGetMeetingDetail(meetingId).then(data => {
      setMeetingData(data);
      navigation.setOptions({
        title: data.meetingMetaData.meetingName,
      });
    });
  };
  const connect = () => {
    client.onConnect = () => {
      log('log', '성공');
      getMeetingData();
      const subscription = client.subscribe(
        `/sub/meetings/${meetingId}`,
        async frame => {
          log('log', frame);
          const data = await JSON.parse(frame.body);

          onMessage(data);
        },
      );
    };

    client.activate();
  };

  // 초반데이터로드

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    getMeetingData();
  }, []);

  useEffect(() => {
    if (MEETING_UPDATE) {
      getMeetingData();
      dispatch(setMeetingUpdateEnd());
    }
  }, [MEETING_UPDATE]);
  useEffect(() => {
    if (MEMBER_UPDATE) {
      getMeetingData();
      Toast.show({ text1: '새로운 멤버가 추가되었습니다.' });

      dispatch(setMemberUpdateEnd());
    }
  }, [MEMBER_UPDATE]);

  return meetingData ? (
    <WebSocketProvider>
      <TouchableWithoutFeedback onPress={() => setCloseTime(!closeTime)}>
        <View style={styles.container}>
          <View>
            <MemberBox
              hostId={meetingData?.meetingMetaData.hostUser.userId}
              meetingUsers={meetingData.members}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Label>모임기간</Label>
            <DateContainer
              startTime={meetingData.meetingMetaData.meetingStartTime}
              startFrom={meetingData.meetingMetaData.calendar.startFrom}
              endTo={meetingData.meetingMetaData.calendar.endTo}
              onPressOut={onPressOut}
              onPressLabel={onPressLabel}
            />
            <Label style={styles.coursePlaceLabel}>모임장소</Label>
            <MapView style={styles.mapStyle} />

            {meetingData?.places && <PlaceCard data={meetingData.places} />}
            <AddPlaceButton iconName="map" text={guideText} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </WebSocketProvider>
  ) : (
    <MeetingRoomSkeleton />
  );
}

export default MeetingRoom;

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  userContainer: {
    marginTop: 12,
    marginBottom: 28,
  },
  coursePlaceLabel: {
    marginBottom: 12,
  },
  mapStyle: {
    height: 300,
    borderRadius: 10,
  },

  dateBoxContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  memberBox: {
    marginTop: 12,
    marginBottom: 12,
    height: 42 * 2,
    flexDirection: 'row',
  },
  cardNumberingBox: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
