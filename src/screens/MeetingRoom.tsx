import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { makeStyles, Skeleton } from '@rneui/themed';

import MapView from 'react-native-maps';
import IconInputBox from '@components/input/IconInputBox';

import { IconProps } from '@type/index';
import { RootStackScreenProps } from '@type/navigation';
import TimePicker from '@components/meeting/Timepicker';
import { GetMeetingDetailResponse } from '@type/api.meeting';

import { requestGetMeetingDetail } from '@api/meeting/meetings';
import { useNavigation } from '@react-navigation/native';
import GenerateLog from '@utils/GenerateLog';
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
      {/* {//데이트박스} */}
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
  const [closeTime, setCloseTime] = useState(false);
  const navi = useNavigation();
  const log = GenerateLog('log', { time: true, hidden: false });
  const onPressLabel = () => {
    navi.navigate('MeetingRoomCalendar');
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
  const [meetingData, setMeetingData] = useState<GetMeetingDetailResponse>();
  const getMeetingData = () => {
    requestGetMeetingDetail(10).then(data => setMeetingData(data));
  };

  useEffect(() => {
    getMeetingData();
  }, []);

  useEffect(() => {
    log('log', meetingData);

    if (meetingData) {
      navigation.setOptions({
        title: meetingData.meetingMetaData.meetingName,
      });
    }
  }, [log, meetingData, navigation]);

  return meetingData ? (
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
          <DateContainer onPressOut={onPressOut} onPressLabel={onPressLabel} />
          <Label style={styles.coursePlaceLabel}>모임장소</Label>
          <MapView style={styles.mapStyle} />

          {meetingData?.places && <PlaceCard data={meetingData.places} />}
          <AddPlaceButton iconName="map" text={guideText} />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <MeetingRoomSkeleton />
  );
}

export default MeetingRoom;

const useStyles = makeStyles(theme => ({
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
  iconColor: {
    color: theme.grayscale['500'],
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
