/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { makeStyles, Overlay } from '@rneui/themed';

import {
  CalendarBoxProps,
  MeetingResponse,
  OverayCalendarProps,
} from '../types';
import Font from '../components/Font';
import Label from '../components/input/Label';
import PlaceCard from '../components/places/PlaceCard';
import { RootStackScreenProps } from '../navigation';
import Calendar from '../components/calendar/Calendar';
import MemberBox from '../components/member/MemberBox';
import AddPlaceButton from '../components/buttons/AddPlaceButton';

function MeetingRoom({ navigation }: RootStackScreenProps<'MeetingRoom'>) {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);
  const onPressLabel = () => {
    setVisible(!visible);
  };
  const guideText = '새로운 코스를 추가해보세요!';
  const dummyMeetingData: MeetingResponse = {
    id: 1000,
    myMeetingUserId: 11,
    myMeetingRole: 'HOST',
    title: '여름이었다',
    startDate: '2023-01-10',
    endDate: '2023-01-30',
    meetingUsers: [
      {
        id: 10,
        nickname: 'nickname1',
        imageLink: 'https://randomuser.me/api/portraits/men/36.jpg',
        meetingRole: 'EDITOR',
      },
      {
        id: 11,
        nickname: 'nickname2',
        imageLink: 'https://randomuser.me/api/portraits/men/37.jpg',
        meetingRole: 'HOST',
      },
      {
        id: 12,
        nickname: 'nickname2',
        imageLink: 'https://randomuser.me/api/portraits/men/38.jpg',
        meetingRole: 'PARTICIPANT',
      },
      {
        id: 13,
        nickname: 'nickname2',
        imageLink: 'https://randomuser.me/api/portraits/men/39.jpg',
        meetingRole: 'PARTICIPANT',
      },
    ],
    meetingDates: [
      {
        id: 10,
        date: '2023-01-15',
        userCount: 1,
        dateStatus: 'UNFIXED',
        isSelected: true,
      },
      {
        id: 11,
        date: '2023-01-25',
        userCount: 2,
        dateStatus: 'FIXED',
        isSelected: false,
      },
    ],
    meetingPlaces: [
      {
        id: 10,
        apiId: 1000,
        category: 'BAR',
        name: 'place1',
        address: 'address1',
        description: 'memo1',
        lat: 10.1,
        lng: 20.1,
        order: 1,
      },
      {
        id: 11,
        apiId: 2000,
        category: 'CAFE',
        name: 'place2',
        address: 'address1',
        description: 'memo2',
        lat: 110.1,
        lng: 120.1,
        order: 2,
      },
    ],
  };

  useEffect(() => {
    navigation.setOptions({
      title: dummyMeetingData.title,
    });
  }, [dummyMeetingData.title, navigation]);

  return (
    <>
      <View style={styles.container}>
        <MemberBox
          myId={dummyMeetingData.myMeetingUserId}
          myRole={dummyMeetingData.myMeetingRole}
          meetingUsers={dummyMeetingData.meetingUsers}
        />

        <Pressable style={styles.labelContainer} onPress={onPressLabel}>
          <Label>모임기간</Label>
          <Font style={styles.subLabelStyle}>
            {dummyMeetingData.startDate} ~ {dummyMeetingData.endDate}
          </Font>
        </Pressable>
        <CalendarBox data={dummyMeetingData} />
        <Label style={styles.coursePlaceLabel}>모임장소</Label>
        {/* TODO map들어갈 자리 */}
        <ScrollView
          style={styles.courseContainer}
          showsVerticalScrollIndicator={false}
        >
          <PlaceCard data={dummyMeetingData.meetingPlaces} />
          <AddPlaceButton
            navigation={navigation}
            iconName="map"
            text={guideText}
          />
        </ScrollView>
      </View>
      <OverlayCalendar visible={visible} onPressLabel={onPressLabel} />
    </>
  );
}

function OverlayCalendar({ visible, onPressLabel }: OverayCalendarProps) {
  const styles = useStyles();

  return (
    <Overlay
      overlayStyle={styles.overlayStyle}
      isVisible={visible}
      onBackdropPress={onPressLabel}
    >
      <View style={styles.calendarViewStyle}>
        <Calendar type="PERIOD" data={undefined} />
      </View>
    </Overlay>
  );
}

function CalendarBox({ data }: CalendarBoxProps) {
  const styles = useStyles();

  return (
    <View style={styles.calendarContainer}>
      <Calendar type="DEFAULT" data={data} />
    </View>
  );
}

export default MeetingRoom;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  calendarContainer: {
    width: '100%',
    height: 280,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  courseContainer: {
    marginTop: 12,
    marginBottom: 28,
  },
  userContainer: {
    marginTop: 12,
    marginBottom: 28,
  },

  coursePlaceLabel: {
    marginTop: 28,
  },
  subLabelStyle: {
    color: theme.grayscale[700],
    lineHeight: theme.textStyles.body1.lineHeight,
    fontSize: theme.textStyles.body1.fontSize,
    fontWeight: 'normal', // TODO 추후 normal Weight로 재설정
  },
  overlayStyle: {
    width: '90%',
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  calendarViewStyle: {
    width: '100%',
    height: 700,
  },
}));
