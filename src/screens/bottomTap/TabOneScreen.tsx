import { View } from 'react-native';
import React, { useState } from 'react';
import { Overlay, makeStyles } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchBarMock } from '@components/SearchBar';
import { IconButton } from '@components/button/Buttons';
import CardList from '@components/meetingCard/CardList';
import { MeetingMode } from '@features/meetingSlice';
import useGoToScreen from '@hooks/useGoTo';
import ModalCalendar from '@components/calendar/ModalCalendar';
import useMeeting from '@hooks/useMeeting';
import { detailConfig } from '@constants/config';

// 모임 관리 스크린
export default function TabOneScreen() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <OneScreenTop />
      <OneScreenMain />
    </SafeAreaView>
  );
}

function OneScreenTop() {
  const styles = useStyles();

  return (
    <View style={styles.screenTopContainer}>
      <DateRangeSerchBar />

      <CreateMeetingRoomButton />
    </View>
  );
}

function OneScreenMain() {
  const styles = useStyles();

  return (
    <View style={styles.cardContainer}>
      <CardList />
    </View>
  );
}

const { text } = detailConfig;

function DateRangeSerchBar() {
  const styles = useStyles();
  const [visible, setVisible] = useState<boolean>(false);
  const { calendarData } = useMeeting();
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <View style={styles.serchContainer}>
        <SearchBarMock
          fontSize={14}
          text={
            calendarData.startFrom ? text.range(calendarData) : '날짜 필터링'
          }
          searchIcon="date-range"
          onPress={toggleOverlay}
        />
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayStyle}
      >
        <ModalCalendar toggleOverlay={toggleOverlay} />
      </Overlay>
    </>
  );
}

function CreateMeetingRoomButton() {
  const styles = useStyles();
  const { goToCreateMeetingScreen } = useGoToScreen();

  return (
    <View style={styles.buttonContainer}>
      <IconButton
        icon={{
          iconName: 'add',
          size: styles.buttonIcon.size,
          color: styles.buttonIcon.color,
        }}
        onPress={() => goToCreateMeetingScreen(MeetingMode.create)}
        style={styles.button}
      />
    </View>
  );
}

const useStyles = makeStyles(() => ({
  screenContainer: {
    flex: 1,
    paddingBottom: -38, // 네비게이션 탭 패딩 공간 제거
  },
  screenTopContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
  },
  serchContainer: {
    flex: 0.85,
  },
  buttonContainer: {
    flex: 0.15,
    alignItems: 'center',
  },
  buttonIcon: {
    size: 24,
    color: '#231F20',
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  calendarContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  overlayStyle: {
    flex: 0.56,
    width: '80%',
    borderRadius: 10,
  },
  flexButtonStyle: {
    marginBottom: 12,
  },
}));
