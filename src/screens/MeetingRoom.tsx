import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { makeStyles, Overlay } from '@rneui/themed';

import Calendar from '@components/calendar/Calendar';
import MapView from 'react-native-maps';
import IconInputBox from '@components/input/IconInputBox';

import { IconProps, MeetingResponse, OverayCalendarProps } from '@type/index';
import { RootStackScreenProps } from '@type/navigation';
import TimePicker from '@components/meeting/Timepicker';

import { serverAxios } from '@api/axiosInstance';
import generateLog from '@utils/log';
import Label from '../components/input/Label';
import PlaceCard from '../components/places/PlaceCard';
import MemberBox from '../components/member/MemberBox';
import AddPlaceButton from '../components/buttons/AddPlaceButton';

interface DateContainerProps {
  onPressLabel: () => void;
  onPressOut: (
    openTime: boolean,
    setOpenTime: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}

function DateContainer({ onPressLabel, onPressOut }: DateContainerProps) {
  const styles = useStyles();
  const iconConfig: IconProps = {
    name: 'calendar-today',
    size: 24,
    color: styles.iconColor.color,
  };

  return (
    <>
      <View style={[styles.dateBoxContainer]}>
        <View style={{ flex: 0.7, marginRight: 12 }}>
          <IconInputBox
            iconConfig={iconConfig}
            value={`${'2023-02-16'} ~ ${'2023-02-16'}`}
            condition
            placeholder="유력날짜"
          />
        </View>

        <View style={{ flex: 0.35 }}>
          <TimePicker onPressOut={onPressOut} />
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.labelContainer,
          pressed && styles.pressed,
        ]}
        onPress={onPressLabel}
      >
        <View style={{ width: '100%' }}>
          <IconInputBox
            iconConfig={iconConfig}
            value="유력한 날짜"
            condition={false}
            placeholder="날짜를 투표해 주세요"
            style={styles.dateBox}
          />
        </View>
      </Pressable>
    </>
  );
}

function MeetingRoom({ navigation }: RootStackScreenProps<'MeetingRoom'>) {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);
  const [closeTime, setCloseTime] = useState(false);
  const onPressLabel = () => {
    setVisible(!visible);
  };
  const onPressOut = (
    openTime: boolean,
    setOpenTime: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (openTime && closeTime) {
      setOpenTime(!openTime);
      setCloseTime(false);
    }
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
  const URL = `/api/v1/meetings/${10}`;
  const log2 = generateLog('log', { time: true, hidden: false });
  const [metaData, setMeetingMetaData] = useState({});
  const getMeetingData = async () => {
    const res = await serverAxios.get<MeetingResponse>(URL);
    const { data } = res;
  };

  getMeetingData();
  useEffect(() => {
    navigation.setOptions({
      title: dummyMeetingData.title,
    });
  }, [dummyMeetingData.title, navigation]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setCloseTime(!closeTime)}>
        <View style={styles.container}>
          <View>
            <MemberBox
              myId={dummyMeetingData.myMeetingUserId}
              myRole={dummyMeetingData.myMeetingRole}
              meetingUsers={dummyMeetingData.meetingUsers}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Label>모임기간</Label>
            <DateContainer
              onPressOut={onPressOut}
              onPressLabel={onPressLabel}
            />
            <Label style={styles.coursePlaceLabel}>모임장소</Label>
            <MapView style={styles.mapStyle} />
            <PlaceCard data={dummyMeetingData.meetingPlaces} />
            <AddPlaceButton
              navigation={navigation}
              iconName="map"
              text={guideText}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
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

export default MeetingRoom;

const useStyles = makeStyles((theme, dropBoxTop: number) => ({
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
  courseContainer: {
    flex: 8,
    width: '100%',
    marginTop: 12,
    marginBottom: 28,
  },
  userContainer: {
    marginTop: 12,
    marginBottom: 28,
  },

  coursePlaceLabel: {
    marginBottom: 12,
  },
  subLabelStyle: {
    color: theme.grayscale[700],
    lineHeight: theme.textStyles.body1.lineHeight,
    fontSize: theme.textStyles.body1.fontSize,
    fontWeight: 'normal',
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
  mapStyle: {
    height: 300,
    borderRadius: 10,
  },
  iconColor: {
    color: theme.grayscale['500'],
  },
  fontColor: {
    color: 'black',
  },
  dateBoxContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  dateBox: { justifyContent: 'center' },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  datePressed: {
    opacity: 0.7,

    backgroundColor: theme.grayscale['200'],
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    zIndex: 4,
    elevation: 5,
    height: (dropBoxTop - 5) * 2.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownItem: {
    borderTopWidth: 1,
    borderRadius: 4,
    borderColor: theme.grayscale['200'],
    padding: 12,

    alignItems: 'center',
  },
}));
